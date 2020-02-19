const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');

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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
