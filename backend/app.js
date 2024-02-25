require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const NotFoundError = require('./errors/NotFaundError');

const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const {
  login, createUser,
} = require('./controllers/users');
const auth = require('./middleware/auth');

const { PORT = 3000 } = process.env;
const connectDatabase = require('./data/database');

const app = express();
connectDatabase();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use('/', cardsRouter);
app.use('/', usersRouter);

app.use('/', (req, res, next) => {
  const notFoundError = new NotFoundError('Request was not found');
  return next(notFoundError);
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'A server error occurred'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
