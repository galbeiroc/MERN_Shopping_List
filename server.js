const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/items');
const users = require('./routes/users');

const app = express();

//BodyParser Middleware
app.use(bodyParser.json());

//Db Config
const db = require('./config/keys').mongoUri;

//Connect to Mongo
mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected..'))
  .catch(err => console.error(err));

//Use Routes
app.use('/api/items', items);
app.use('/api/users', users);

//Services static assets if in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
