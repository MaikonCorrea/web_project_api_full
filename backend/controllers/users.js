const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { createHash } = require('../utils/hash');
const ValidationError = require('../errors/ValidationError');

module.exports = {

  createUser: async (req, res, next) => {
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
      next(error);
    }
  },

  listUsers: async (req, res) => {
    const users = await User.find();
    res.status(200).json({ users });
  },

  userMe: async (req, res, next) => {
    try {
      const { user } = req;
      const id = user._id;
      const userData = await User.findById(id).select('name about email avatar _id');
      if (!userData) {
        const validationError = new ValidationError('User not found');
        return next(validationError);
      }
      const {
        name, about, email, avatar, _id,
      } = userData;
      return res.status(201).json({
        name, about, email, avatar, _id,
      });
    } catch (error) {
      next(error);
    }
  },

  updateProfile: async (req, res, next) => {
    try {
      const { user } = req;
      const updatedData = req.body;
      const existingUser = await User.findById(user._id);
      if ('name' in updatedData || 'about' in updatedData) {
        if ('name' in updatedData) existingUser.name = updatedData.name;
        if ('about' in updatedData) existingUser.about = updatedData.about;

        await existingUser.validate();

        const updatedUser = await existingUser.save();
        return res.status(200).json(updatedUser);
      }
      const validationError = new ValidationError('No valid data provided for update!');
      return next(validationError);
    } catch (error) {
      next(error);
    }
  },

  updateUserAvatar: async (req, res, next) => {
    try {
      const { user } = req;
      const updatedData = req.body;
      const existingUser = await User.findById(user._id);
      if (!existingUser) {
        const validationError = new ValidationError('No valid data provided for update!');
        return next(validationError);
      } if ('avatar' in updatedData) {
        const { avatar } = updatedData;
        existingUser.avatar = avatar;
      }
      await existingUser.validate();
      const updatedUser = await existingUser.save();
      return res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findUserByCredentials(email, password);
      const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: '7d' });
      res.send({ token });
    } catch (error) {
      next(error);
    }
  },
};
