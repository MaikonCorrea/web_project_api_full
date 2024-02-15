const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { createHash } = require('../utils/hash');

const CustomError = require('../errors/CustomError');

module.exports = {
  createUser: async (req, res) => {
    const { body } = req;
    const {
      email,
      password,
      name,
      about,
      avatar,
    } = body;
    const hashedPassword = createHash(password);
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      about,
      avatar,
    });
    try {
      const user = await newUser.save();
      res.status(201).json({ success: true, user });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to create user', error: error.message });
    }
  },

  listUsers: async () => {
    const users = await User.find();
    return users;
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
      } if ('avatar' in updatedData) {
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

  login: (req, res) => {
    const { email, password } = req.body;
    User.findUserByCredentials(email, password)
      .then((user) => {
        const token = jwt.sign({ _id: user._id }, 'chave-secreta', { expiresIn: '7d' });
        res.send({ token });
      })
      .catch((err) => {
        res.status(401).send({ message: err.message });
      });
  },
};
