const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const postRouter = require('./routers/post'); //  import router

const app = express();

app.use(express.json());

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('connected to database');
  // switch to another database
  // database = database.db(DATABASE_NAME);
});
mongoose.connection.on('error', console.error);

app.get('/', (req, res) => {
  res.send('home');
});
app.use('/post', postRouter);

app.listen(4000);
