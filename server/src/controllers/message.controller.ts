import { NextFunction, Request, Response } from 'express';
import { getAuthRequest } from '../utils/common.utils';
import { Types } from 'mongoose';
import { io } from '../server';
import groupService from '../services/group.service';
import messageService from '../services/message.service';

const messageController = {
  getMessages: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const groupId = authReq.params.groupId;
      const page = parseInt(req.query.page as string) || 1;
      const totalMessages = await messageService.countMessages(groupId);
      const messages = await messageService.getPage(groupId, page);
      await groupService.markRead(groupId, authReq.user.id);
      res.status(200).json({
        messages,
        page,
        hasNextPage: page * 50 < totalMessages,
      });
    } catch (error) {
      next(error);
    }
  },

  sendMessage: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const groupId = authReq.params.groupId;
      const content: string = authReq.body.content;

      io.to(groupId).emit('new-message', {
        group: groupId,
        sender: authReq.user.id,
        content,
        createdAt: new Date(),
      });

      const message = await messageService.sendMessage({
        group: new Types.ObjectId(groupId),
        sender: new Types.ObjectId(authReq.user.id),
        content,
      });
      await groupService.updateGroup(groupId, { lastMessage: message });
      await groupService.markRead(groupId, authReq.user.id);
      res.status(201).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default messageController;
