const express = require('express');
const mongodb = require('mongodb');
const templateEngines = require('consolidate');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

const app = express();
const MongoClient = mongodb.MongoClient;

app.engine('html', templateEngines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  // response.send('You are on your home page');
  response.render('home');
});

app.get('/home', (request, response) => {
  // response.send('You are on your home page');
  response.render('home');
});

app.post('/createNewEntry', (request, response) => {

  // console.log('---------------request: ', request);
  console.log('---------------request.body: ', request.body);
  let title = request.body.title;
  let year = request.body.year;
  let imdb = request.body.imdb;
  console.log('movieName is: ', title);
  console.log('movieYear is: ', year);
  console.log('Type of: ', typeof year);

  if ( title == '' || year == '' || imdb == '' ) {
    response.render('failedToAdd', {'value': 'One or more field left missing'});
  }

  else {
    MongoClient.connect('mongodb://localhost:27017', (err, client) => {

      if (err) {
        console.log('cannot connect');
      }

      let db = client.db('video');
      db.collection('movies').insertOne({'title': title, 'year': year, 'imdb': imdb})
      .then((fulfilled) => {
        console.log('Ack received: ', fulfilled);
        console.log('Movie entered is: ', fulfilled.ops[0].title);
        response.render('success', {'result': fulfilled.ops[0].title})
      })
      .catch((rejected) => {
        response.render('failed', {'result': 'One or more filed left empty. Try again.'})
      })

    });
  }

});

app.use((request, response) => {
  response.send('This is default routing page');
})

app.listen(3000, () => {
  console.log('express server listening on port 3000');
})
