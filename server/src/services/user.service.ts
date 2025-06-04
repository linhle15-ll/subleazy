import UserModel from '../models/user.model';

const userService = {
  getUserById: async (userId: string) => {
    // select specific fields to be returned to the frontend
    const user = await UserModel.findById(userId).select(
      'firstName lastName email profileImage institution bio'
    );

    return user;
  },
};

export default userService;
