const express = require('express');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const connectDatabase = require('./data/database');

const app = express();
connectDatabase();

app.use(express.json());

const authMiddleware = async (req, res, next) => {
  req.user = { _id: '6557b55548d2c1cf8c0b72db' };
  next();
};

app.use(authMiddleware);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('/', (req, res, next) => {
  res.status(404).json({ message: 'A solicitação não foi encontrada mesmo', status: 404 });
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
