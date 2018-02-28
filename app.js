const express = require('express');
const mongodb = require('mongodb');
const templateEngines = require('consolidate');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

const app = express();
const MongoClient = mongodb.MongoClient();

app.engine('html', templateEngines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.send('You are on your home page');
})

app.use((request, response) => {
  response.send('This is default routing page');
})

app.listen(3000, () => {
  console.log('express server listening on port 3000');
})
