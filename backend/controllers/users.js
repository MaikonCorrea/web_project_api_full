const User = require('../models/user');
const CustomError = require('../errors/CustomError');

module.exports = {
  listUsers: async () => {
    const users = await User.find();
    return users;
  },
  createUser: async (body) => {
    const {
      email,
      name,
      about,
      avatar,
    } = body;

    const newUser = new User({
      email,
      name,
      about,
      avatar,
    });
    try {
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      if (error.name === 'ValidationError') {
        const field = Object.keys(error.errors)[0];
        const { message } = error.errors[field];
        throw new CustomError(message, 'ValidationError', 400);
      }
      throw error;
    }
  },

  updateProfile: async (userId, updatedData) => {
    const existingUser = await User.findById(userId);
    try {
      if ('name' in updatedData || 'about' in updatedData) {
        if ('name' in updatedData) existingUser.name = updatedData.name;
        if ('about' in updatedData) existingUser.about = updatedData.about;

        await existingUser.validate();

        const updatedUser = await existingUser.save();
        return updatedUser;
      }
      throw new CustomError('Nenhum dado válido fornecido para atualização!', 'InvalidDataError', 400);
    } catch (error) {
      if (error.name === 'ValidationError') {
        const field = Object.keys(error.errors)[0];
        const { message } = error.errors[field];
        throw new CustomError(message, 'ValidationError', 400);
      }
      throw error;
    }
  },

  updateUserAvatar: async (userId, updatedData) => {
    try {
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        throw new CustomError('Usuário não encontrado', 'NotFoundError', 404);
      }
      if ('avatar' in updatedData) {
        const { avatar } = updatedData;
        existingUser.avatar = avatar;
      }
      await existingUser.validate();
      const updatedUser = await existingUser.save();
      return updatedUser;
    } catch (error) {
      if (error.name === 'ValidationError') {
        const field = Object.keys(error.errors)[0];
        const { message } = error.errors[field];
        throw new CustomError(message, 'ValidationError', 400);
      }
      throw error;
    }
  },
};
