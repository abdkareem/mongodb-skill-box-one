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
  // response.send('You are on your home page');
  response.render('home');
})

app.post('/createNewEntry', (request, response) => {
  //let movieName = req.body.
  // console.log('Entered in createNewEntry');
  console.log('---------------request: ', request);
  console.log('---------------request.body: ', request.body);
  let movieName = request.body.movieName;
  response.render('entryResult', {'key1': movieName});
});

app.use((request, response) => {
  response.send('This is default routing page');
})

app.listen(3000, () => {
  console.log('express server listening on port 3000');
})
