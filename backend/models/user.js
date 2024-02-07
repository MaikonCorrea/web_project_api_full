const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O campo name precisa ser preenchido'],
    minlength: [2, 'O nome deve ter pelo menos 2 caracteres'],
    maxlength: [30, 'O nome não pode ter mais de 30 caracteres'],
  },
  about: {
    type: String,
    required: [true, 'O campo about precisa ser preenchido'],
    minlength: [2, 'O campo about deve ter pelo menos 2 caracteres'],
    maxlength: [30, 'O campo about não pode ter mais de 30 caracteres'],
  },
  avatar: {
    type: String,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('user', userSchema);
