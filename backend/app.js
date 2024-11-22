require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors, celebrate, Joi } = require('celebrate');
const NotFoundError = require('./errors/NotFaundError');
const { requestLogger, errorLogger } = require('./middleware/logger');

const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const {
  login, createUser,
} = require('./controllers/users');
const auth = require('./middleware/auth');

const { PORT = 3000 } = process.env;
const connectDatabase = require('./data/database');
const allowedOrigins = require('./middleware/allowedCors');

const app = express();
connectDatabase();

app.use(requestLogger);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: allowedOrigins }));

app.post('/signin', celebrate({
  headers: Joi.object().keys({
    accept: Joi.string().valid('application/json').required(),
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(true),
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  headers: Joi.object().keys({
    accept: Joi.string().valid('application/json').required(),
    'content-type': Joi.string().valid('application/json').required(),
  }).unknown(true),
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.use(auth);
app.use('/', cardsRouter);
app.use('/', usersRouter);

app.use('/', (req, res, next) => {
  const notFoundError = new NotFoundError('Request was not found');
  return next(notFoundError);
});

app.use(errorLogger);

app.use(errors());

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
