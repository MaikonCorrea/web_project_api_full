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
      message: 'Formato do e-mail é inválido!',
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
    minlength: [2, 'O nome deve ter pelo menos 2 caracteres'],
    maxlength: [30, 'O nome não pode ter mais de 30 caracteres'],
  },
  about: {
    type: String,
    default: 'Explorer',
    minlength: [2, 'O campo about deve ter pelo menos 2 caracteres'],
    maxlength: [30, 'O campo about não pode ter mais de 30 caracteres'],
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
        return Promise.reject(new Error('Email ou Senha incorretos!'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Email ou senha incorretos!'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
