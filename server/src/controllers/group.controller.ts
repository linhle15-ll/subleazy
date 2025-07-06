import { NextFunction, Request, Response } from 'express';
import { getAuthRequest } from '../utils/common.utils';
import { Group } from '../types/group.types';
import { ObjectId, Types } from 'mongoose';
import groupService from '../services/group.service';

const groupController = {
  createGroup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const reqUserId = new Types.ObjectId(authReq.user.id);
      const data: Group = authReq.body;

      if (!('isDM' in (data as object))) data.isDM = true;
      if (!data.members.includes(reqUserId)) data.members.push(reqUserId);

      if (!data.isDM && data.members.length > 2) {
        res.status(400).json({ error: 'DMs can only have 2 members' });
        return;
      }

      if (data.isDM) {
        data.members.sort();
        const dm = await groupService.findExistingDM(
          data.members as ObjectId[]
        );
        if (dm) {
          res.status(200).json(dm);
          return;
        }
      }

      const group = await groupService.createGroup(data);
      res.status(201).json(group);
    } catch (error) {
      next(error);
    }
  },

  // getAllGroups: async (req: Request, res: Response, next: NextFunction) => {
  //     try {
  //         const authReq = getAuthRequest(req);
  //         const groups = await groupService.getUserGroups(authReq.user.id);
  //         res.status(200).json(groups);
  //     } catch (error) {
  //         next(error);
  //     }
  // },
};

export default groupController;
