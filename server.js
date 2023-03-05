const express = require('express');
const mongodb = require('mongodb').MongoClient;
// We import the ObjectId() function from MongoDB
const ObjectId = require('mongodb').ObjectId;
const db = require('./config/connection')
const routes = require('./routes')

const app = express();
const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
db.once('open',() => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}) 