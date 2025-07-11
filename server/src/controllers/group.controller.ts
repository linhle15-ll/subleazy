import { NextFunction, Request, Response } from 'express';
import { getAuthRequest } from '../utils/common.utils';
import { Group } from '../types/group.types';
import { ObjectId, Types } from 'mongoose';
import groupService from '../services/group.service';
import { User } from '../types/user.types';
import { io } from '../server';

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
      await groupService.markRead(group._id.toString(), authReq.user.id);
      res.status(201).json(group);

      for (const member of data.members) {
        io.to(member.toString()).emit('new-group', group);
      }
    } catch (error) {
      next(error);
    }
  },

  getAllGroups: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const groups = await groupService.getUserGroups(authReq.user.id);
      const transformedData = groups.map((group) => {
        let name = group.name || '';
        if (group.isDM) {
          const otherUser = group.members.find(
            (member) => (member as User)?._id?.toString() !== authReq.user.id
          );
          if (otherUser)
            name =
              (otherUser as User).firstName +
              ' ' +
              (otherUser as User).lastName;
        } else if (!group.name) {
          const firstNames = group.members.map(
            (member) => (member as User).firstName
          );
          name = firstNames.join(', ');
        }
        return {
          ...group,
          name,
        };
      });
      res.status(200).json(transformedData);
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

      const updatedGroup = await groupService.updateGroup(groupId, {
        members: group.members,
      });
      await groupService.markRead(groupId, authReq.user.id);

      // io.to(groupId).emit('members-added', updatedGroup);

      res.status(200).json(updatedGroup);
    } catch (error) {
      next(error);
    }
  },

  leaveGroup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const groupId = authReq.params.groupId;

      io.to(groupId).emit('member-left', groupId, authReq.user.id);

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

      const updatedGroup = await groupService.updateGroup(groupId, {
        members: group.members,
      });
      res.status(200).json(updatedGroup);
    } catch (error) {
      next(error);
    }
  },

  renameGroup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const groupId = authReq.params.groupId;
      const name = authReq.body.name;

      io.to(groupId).emit('group-renamed', groupId, name);

      const group = await groupService.getGroup(groupId);
      if (!group) {
        res.status(404).json({ error: 'Group not found' });
        return;
      }

      if (group.isDM) {
        res.status(400).json({ error: 'Cannot rename a DM' });
        return;
      }

      const updatedGroup = await groupService.updateGroup(groupId, { name });
      await groupService.markRead(groupId, authReq.user.id);
      res.status(200).json(updatedGroup);
    } catch (error) {
      next(error);
    }
  },

  getGroupMembers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const groupId = authReq.params.groupId;
      const group = await groupService.getGroup(groupId);
      if (!group) {
        res.status(404).json({ error: 'Group not found' });
        return;
      }
      await group.populate('members', 'firstName lastName');
      res.status(200).json(group.members);
    } catch (error) {
      next(error);
    }
  },

  getPostIdByGroupId: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const groupId = req.params.groupId;

      if (!groupId) {
        res.status(400).json({ error: 'Group ID is required' });
        return;
      }

      const postId = await groupService.getPostIdByGroupId(groupId);

      if (!postId) {
        res.status(404).json({ error: 'Post not found for this group' });
        return;
      }

      res.status(200).json({
        success: true,
        data: { postId: postId.toString() },
      });
    } catch (error) {
      next(error);
    }
  },
};

export default groupController;
