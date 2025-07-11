import { NextFunction, Request, Response } from 'express';
import { getAuthRequest } from '../utils/common.utils';
import { Group } from '../types/group.types';
import { ObjectId, Types } from 'mongoose';
import groupService from '../services/group.service';
import { User } from '../types/user.types';
import { io } from '../server';
import messageService from '../services/message.service';
import { Post } from '../types/post.types';

const groupController = {
  createGroup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const data: Group = authReq.body;

      if (!('isDM' in (data as object))) data.isDM = true;
      const memberIds = (data.members as User[]).map((member) => member._id);
      memberIds.push(new Types.ObjectId(authReq.user.id));

      const members = await groupService.sieveUsers(memberIds as ObjectId[]);

      if (data.isDM) {
        if (members.length !== 2) {
          res.status(400).json({ error: 'DMs must have exactly 2 members' });
          return;
        }

        members.sort();
        const dm = await groupService.findExistingDM(members as ObjectId[]);
        if (dm) {
          res.status(200).json(dm);
          return;
        }
      }

      const group = await groupService.createGroup({ ...data, members });
      for (const member of members) {
        await groupService.markRead(group._id.toString(), member.toString());
      }

      if (group.isDM) {
        const otherUser = group.members.find(
          (member) => (member as User)?._id?.toString() !== authReq.user.id
        );
        if (otherUser)
          group.name =
            (otherUser as User).firstName + ' ' + (otherUser as User).lastName;
      } else if (!group.name) {
        const firstNames = group.members.map(
          (member) => (member as User).firstName
        );
        group.name = firstNames.join(', ');
      }

      for (const member of members) {
        io.to(member.toString()).emit('new-group', group);
      }

      res.status(201).json(group);
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

      const members: User[] = authReq.body.members;
      const existingMembers = group.members.map((member) => member.toString());
      const newMembers = members.filter(
        (member) => !existingMembers.includes(member._id!.toString())
      );

      if (newMembers.length === 0) {
        res.status(400).json({ error: 'No new members provided' });
        return;
      }

      io.to(groupId).emit('members-added', groupId, newMembers);

      const content = `${authReq.body.name} added ${newMembers.map((member) => member.firstName).join(', ')} to the group`;
      io.to(groupId).emit('new-message', {
        group: groupId,
        content,
        createdAt: new Date(),
      });

      group.members.push(...newMembers.map((member) => member._id!));
      group.members = await groupService.sieveUsers(
        group.members as ObjectId[]
      );

      const message = await messageService.sendMessage({
        group: new Types.ObjectId(groupId),
        content,
      });

      const updatedGroup = await groupService.updateGroup(groupId, {
        members: group.members,
        lastMessage: message,
      });
      await groupService.markRead(groupId, authReq.user.id);

      for (const member of newMembers) {
        await groupService.markRead(groupId, member._id!.toString());
      }

      if (updatedGroup && !updatedGroup.name) {
        const firstNames = updatedGroup.members.map(
          (member) => (member as User).firstName
        );
        updatedGroup.name = firstNames.join(', ');
      }
      for (const member of newMembers) {
        io.to(member._id!.toString()).emit('new-group', updatedGroup);
      }

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

      const content = `${authReq.body.name} left the group`;
      io.to(groupId).emit('new-message', {
        group: groupId,
        content,
        createdAt: new Date(),
      });

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

      const message = await messageService.sendMessage({
        group: new Types.ObjectId(groupId),
        content,
      });

      const updatedGroup = await groupService.updateGroup(groupId, {
        members: group.members,
        lastMessage: message,
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

      const content = `${authReq.body.username} renamed the group to ${name}`;
      io.to(groupId).emit('new-message', {
        group: groupId,
        content,
        createdAt: new Date(),
      });

      const message = await messageService.sendMessage({
        group: new Types.ObjectId(groupId),
        content,
      });

      const updatedGroup = await groupService.updateGroup(groupId, {
        name,
        lastMessage: message,
      });
      if (!updatedGroup) {
        res.status(404).json({ error: 'Group not found' });
        return;
      }

      if (updatedGroup.isDM) {
        res.status(400).json({ error: 'Cannot rename a DM' });
        return;
      }

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

  addContractToGroup: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authReq = getAuthRequest(req);
      const groupId = authReq.params.groupId;
      const { contractId } = authReq.body;

      if (!groupId) {
        res.status(400).json({ error: 'Group ID is required' });
        return;
      }

      if (!contractId) {
        res.status(400).json({ error: 'Contract ID is required' });
        return;
      }

      // Check if group exists and user is a member
      const group = await groupService.getGroup(groupId);
      if (group) {
        const isMember = group.members.some(
          (member) => member.toString() === authReq.user.id
        );
        if (!isMember) {
          res.status(403).json({ error: 'Unauthorized to modify this group' });
          return;
        }

        const updatedGroup = await groupService.addContractToGroup(
          groupId,
          contractId
        );

        if (!updatedGroup) {
          res.status(500).json({ error: 'Failed to add contract to group' });
          return;
        }

        res.status(200).json({
          success: true,
          message: 'Contract added to group successfully',
          data: updatedGroup,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  linkPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = getAuthRequest(req);
      const groupId = authReq.params.groupId;
      const post: Post = authReq.body.post;

      io.to(groupId).emit('post-linked', groupId, post);

      const content = `${authReq.body.name} selected post ${post.title}`;
      io.to(groupId).emit('new-message', {
        group: groupId,
        content,
        createdAt: new Date(),
      });

      const message = await messageService.sendMessage({
        group: new Types.ObjectId(groupId),
        content,
      });

      const updatedGroup = await groupService.updateGroup(groupId, {
        post,
        lastMessage: message,
      });
      if (!updatedGroup) {
        res.status(404).json({ error: 'Group not found' });
        return;
      }

      await groupService.markRead(groupId, authReq.user.id);
      res.status(200).json(updatedGroup);
    } catch (error) {
      next(error);
    }
  },
};

export default groupController;
