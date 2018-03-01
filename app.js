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

// MongoClient.connect('mongodb://localhost:27017', (err, client) => {
//   if (err) {
//     console.log('connection refused');
//   }
//   else {
//     console.log('connection established');
//
//     app.get('/', (request, response) => {
//       console.log('router invoked');
//       let db = client.db('players');
//       db.collection('test').find({}).toArray((err, docs) => {
//         if (err) {
//           console.log('couldnt pass into collection');
//         }
//         else {
//           console.log('got into find\n');
//           //response.render('names', {'names': docs})
//           resonse.send('done dona done');
//         }
//       });
//       //db.close();
//     });
//   }
// });

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

  MongoClient.connect('mongodb://localhost:27017', (err, client) => {

    if (err) {
      console.log('cannot connect');
    }

    let db = client.db('video');
    let ackn = db.collection('movies').insertOne({'title': title, 'year': year, 'imdb': imdb});

    if (ackn.acknowledge == 'true') {
      //response.render('entryResult', {'key1': title});
      response.send('Added');
    }
  });

});

app.use((request, response) => {
  response.send('This is default routing page');
})

app.listen(3000, () => {
  console.log('express server listening on port 3000');
})
