import { ObjectId } from 'mongoose';
import groupModel from '../models/group.model';
import { Group } from '../types/group.types';

const groupService = {
  findExistingDM: async (userIds: string[] | ObjectId[]) => {
    const group = await groupModel.findOne({
      members: userIds,
      isDM: true,
    });
    return group;
  },

  createGroup: async (data: Group) => {
    const group = await groupModel.create(data);
    return group;
  },

  getUserGroups: async (userId: string | ObjectId) => {
    const groups = await groupModel
      .find({ members: userId })
      .populate('members', 'firstName lastName profileImage')
      .sort({ updatedAt: -1 });
    return groups;
  },
};

export default groupService;
