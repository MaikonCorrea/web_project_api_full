const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
const isEmail = require('../node_modules/validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Email format is invalid!',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: [2, 'The name must have at least 2 characters'],
    maxlength: [30, 'The name cannot be longer than 30 characters'],
  },
  about: {
    type: String,
    default: 'Explorer',
    minlength: [2, 'The name must have at least 2 characters'],
    maxlength: [30, 'The name cannot be longer than 30 characters'],
  },
  avatar: {
    type: String,
    default: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
  },
}, {
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect Email or Password!'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect Email or Password!'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
