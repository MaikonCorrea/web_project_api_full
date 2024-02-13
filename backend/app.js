const express = require('express');

const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middleware/auth');

const { PORT = 3000 } = process.env;
const connectDatabase = require('./data/database');

const app = express();
connectDatabase();

app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/cards', cardsRouter);

app.use('/', (req, res, next) => {
  res.status(404).json({ message: 'A solicitação não foi encontrada mesmo', status: 404 });
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
