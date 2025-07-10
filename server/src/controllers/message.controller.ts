import { NextFunction, Request, Response } from 'express';
import messageService from '../services/message.service';
import { getAuthRequest } from '../utils/common.utils';
import { Types } from 'mongoose';

const messageController = {
  getMessages: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupId = req.params.groupId;
      const page = parseInt(req.query.page as string) || 1;
      const totalMessages = await messageService.countMessages(groupId);
      const messages = await messageService.getPage(groupId, page);
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
      const message = await messageService.sendMessage({
        group: new Types.ObjectId(groupId),
        sender: new Types.ObjectId(authReq.user.id),
        content,
      });
      res.status(201).json(message);
    } catch (error) {
      next(error);
    }
  },
};

export default messageController;
