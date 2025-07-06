import UserModel from '../models/user.model';

const userService = {
  getUserById: async (userId: string) => {
    // select specific fields to be returned to the frontend
    const user = await UserModel.findById(userId).select(
      'firstName lastName email profileImage bio'
    );

    return user;
  },

  searchUsers: async (query: string) => {
    const regex = new RegExp(query, 'i');
    const users = await UserModel.find({
      $or: [
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } },
        { email: { $regex: regex } },
      ],
    })
      .select('firstName lastName email profileImage')
      .limit(5);

    return users;
  },
};

export default userService;
