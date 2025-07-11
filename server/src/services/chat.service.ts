import { Socket } from 'socket.io';
import groupService from './group.service';

const chatService = {
  joinChat: async (userId: string, socket: Socket) => {
    socket.join(userId);
    const groups = await groupService.getUserGroupsSimple(userId);
    for (const group of groups) socket.join(group._id.toString());
  },
};

export default chatService;
