const mongoose = require('mongoose');

module.exports = async function connectDatabase() {
  await mongoose.connect('mongodb://127.0.0.1:27017/arounddb');
  console.log('Database Conected!');
};
