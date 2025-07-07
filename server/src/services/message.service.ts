import messageModel from '../models/message.model';
import { Message } from '../types/message.types';

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

  sendMessage: async (data: Message) => {
    const message = (await messageModel.create(data)).populate(
      'sender',
      'firstName lastName profileImage'
    );
    return message;
  },
};

export default messageService;
