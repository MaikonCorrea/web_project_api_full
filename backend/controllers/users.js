const bcrypt = require('bcryptjs');
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
      // Retorna uma resposta de sucesso com o novo usuário
      res.status(201).json({ success: true, user });
    } catch (error) {
      // Em caso de erro, envie uma resposta de erro
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

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) { // Verifica se o usuário foi encontrado
        throw new CustomError('E-mail ou senha incorretos', 'NotFoundError', 404);
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new CustomError('Senha incorreta', 'AuthenticationError', 401);
      }
      res.status(200).send({ message: 'Login bem-sucedido' });
    } catch (err) {
      res.status(err.status || 401).send({ message: err.message });
    }
  },
};
