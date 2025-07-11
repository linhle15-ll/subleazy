import { Socket } from 'socket.io';
import groupService from './group.service';

const chatService = {
  joinChat: async (userId: string, socket: Socket) => {
    socket.join(userId);
    const groups = await groupService.getUserGroupsSimple(userId);
    for (const group of groups) await socket.join(group._id.toString());
  },

  markRead: async (groupId: string, userId: string) => {
    await groupService.markRead(groupId, userId);
  },

  leaveGroup: async (groupId: string, socket: Socket) => {
    await socket.leave(groupId);
  },

  joinGroup: async (groupId: string, socket: Socket) => {
    await socket.join(groupId);
  },
};

export default chatService;
