require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

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
  res.status(404).json({ message: 'A solicitação não foi encontrada', status: 404 });
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
