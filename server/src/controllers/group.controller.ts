import { NextFunction, Request, Response } from 'express';
import { getAuthRequest } from '../utils/common.utils';
import { Group } from '../types/group.types';
import { ObjectId, Types } from 'mongoose';
import groupService from '../services/group.service';

const groupController = {
  createGroup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const data: Group = authReq.body;

      if (!('isDM' in (data as object))) data.isDM = true;
      data.members.push(new Types.ObjectId(authReq.user.id));

      data.members = await groupService.sieveUsers(data.members as ObjectId[]);

      if (data.isDM) {
        if (data.members.length !== 2) {
          res.status(400).json({ error: 'DMs must have exactly 2 members' });
          return;
        }

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

  getAllGroups: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const groups = await groupService.getUserGroups(authReq.user.id);
      res.status(200).json(groups);
    } catch (error) {
      next(error);
    }
  },

  addMembers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const groupId = authReq.params.groupId;
      const group = await groupService.getGroup(groupId);

      if (!group) {
        res.status(404).json({ error: 'Group not found' });
        return;
      }

      if (group.isDM) {
        res.status(400).json({ error: 'Cannot add members to a DM' });
        return;
      }

      // TODO: add a system message describing who added who to the group
      const members: typeof group.members = authReq.body.members;
      group.members.push(...members);
      group.members = await groupService.sieveUsers(
        group.members as ObjectId[]
      );

      const updatedGroup = await groupService.updateGroup(groupId, group);
      res.status(200).json(updatedGroup);
    } catch (error) {
      next(error);
    }
  },

  leaveGroup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const groupId = authReq.params.groupId;
      const group = await groupService.getGroup(groupId);

      if (!group) {
        res.status(404).json({ error: 'Group not found' });
        return;
      }

      if (group.isDM) {
        res.status(400).json({ error: 'Cannot leave a DM' });
        return;
      }

      group.members = group.members.filter(
        (member) => member.toString() !== authReq.user.id
      );
      if (group.members.length === 0) {
        await groupService.deleteGroup(groupId);
        res.status(200).json({ message: 'Group deleted' });
        return;
      }

      const updatedGroup = await groupService.updateGroup(groupId, group);
      res.status(200).json(updatedGroup);
    } catch (error) {
      next(error);
    }
  },
};

export default groupController;
