const User = require('../models/user');
const CustomError = require('../errors/CustomError');

module.exports = {
  listUsers: async () => {
    const users = await User.find();
    return users;
  },
  createUser: async (body) => {
    const { name, about, avatar } = body;
    const urlRegex = /^https?:\/\/[^\s]+$/;
    const isAvatarValid = avatar.match(urlRegex);
    if (!isAvatarValid) {
      throw new CustomError(
        'link do Avatar é inválido!',
        'InvalidLinkError',
        400,
      );
    }

    const newUser = new User({ name, about, avatar });
    try {
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      if (error instanceof CustomError) {
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
      if (Object.keys(error.errors).length > 0) {
        const field = Object.keys(error.errors)[0];
        const { message } = error.errors[field];
        throw new CustomError(message, 'ValidationError', 400);
      }
      throw error;
    }
  },

  updateUserAvatar: async (userId, updatedData) => {
    const existingUser = await User.findById(userId);
    try {
      if ('avatar' in updatedData) {
        const urlRegex = /^https?:\/\/[^\s]+$/;
        const isAvatarValid = updatedData.avatar === '' || updatedData.avatar.match(urlRegex);
        if (!isAvatarValid) {
          throw new CustomError('Link do Avatar é inválido!', 'InvalidLinkError', 400);
        }
        existingUser.avatar = updatedData.avatar;
      }
      const updateAvatar = await existingUser.save();
      return updateAvatar;
    } catch (error) {
      if (error.avatar instanceof CustomError) {
        const field = Object.keys(error.errors)[0];
        const { message } = error.errors[field];
        throw new CustomError(message, 'ValidationError', 400);
      }
      throw error;
    }
  },
};
