const mongoose = require('mongoose');

module.exports = function connectDatabase() {
  mongoose.connect(process.env.STRING_CONEXAO);
  console.log('Database Conected!');
};
