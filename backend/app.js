const express = require('express');
const bodyParser = require('body-parser');

const cardsRouter = require('./routes/cards');
const {
  login, createUser, updateProfile,
} = require('./controllers/users');
const auth = require('./middleware/auth');

const { PORT = 3000 } = process.env;
const connectDatabase = require('./data/database');

const app = express();
connectDatabase();

app.use(bodyParser.json());
app.use(auth);
app.post('/signin', login); // em andamento
app.post('/signup', createUser); // funcionando

app.get('/cards', cardsRouter); // funcionando

app.patch('/users/me', updateProfile); // precisa fazer ainda



app.use('/', (req, res, next) => {
  res.status(404).json({ message: 'A solicitação não foi encontrada mesmo', status: 404 });
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
