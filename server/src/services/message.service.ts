import messageModel from '../models/message.model';

const messageService = {
  countMessages: async (groupId: string) => {
    const count = await messageModel.countDocuments({ group: groupId });
    return count;
  },

  getPage: async (groupId: string, page: number) => {
    const messages = await messageModel
      .find({ group: groupId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * 50)
      .limit(50)
      .populate('sender', 'firstName lastName profileImage');
    return messages;
  },
};

export default messageService;
