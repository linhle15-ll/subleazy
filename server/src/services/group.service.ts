import { ObjectId } from 'mongoose';
import groupModel from '../models/group.model';
import { Group } from '../types/group.types';
import userService from './user.service';

const groupService = {
  findExistingDM: async (userIds: (string | ObjectId)[]) => {
    const group = await groupModel
      .findOne({
        members: userIds,
        isDM: true,
      })
      .populate('members', 'firstName lastName email profileImage');
    return group;
  },

  createGroup: async (data: Group) => {
    const group = (await groupModel.create(data)).populate(
      'members',
      'firstName lastName email profileImage'
    );
    return group;
  },

  sieveUsers: async (userIds: (string | ObjectId)[]) => {
    const seen = new Set<string>();
    const validUserIds: typeof userIds = [];

    for (const userId of userIds) {
      const strUserId = userId.toString();
      if (seen.has(strUserId)) continue;
      seen.add(strUserId);

      const user = await userService.getUserById(userId);
      if (user) validUserIds.push(userId);
    }

    return validUserIds as ObjectId[];
  },

  getUserGroups: async (userId: string | ObjectId) => {
    const groups = await groupModel
      .find({ members: userId })
      .populate('members', 'firstName lastName email profileImage')
      .populate('lastMessage')
      .populate('post')
      .sort({ updatedAt: -1 })
      .lean();
    // TODO: populate contracts in here
    return groups;
  },

  getUserGroupsSimple: async (userId: string | ObjectId) => {
    const groups = await groupModel.find({ members: userId });
    return groups;
  },

  getGroup: async (groupId: string | ObjectId) => {
    const group = await groupModel.findById(groupId);
    return group;
  },

  updateGroup: async (
    groupId: string | ObjectId,
    data: Partial<Group>,
    updateTimestamp = true
  ) => {
    const group = await groupModel
      .findByIdAndUpdate(groupId, data, {
        new: true,
        timestamps: updateTimestamp,
      })
      .populate('members', 'firstName lastName email profileImage');
    return group;
  },

  markRead: async (groupId: string, userId: string) => {
    await groupService.updateGroup(
      groupId,
      { [`lastRead.${userId}`]: new Date() },
      false
    );
  },

  deleteGroup: async (groupId: string | ObjectId) => {
    await groupModel.findByIdAndDelete(groupId);
  },
};

export default groupService;
