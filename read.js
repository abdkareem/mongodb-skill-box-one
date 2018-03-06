const MongoClient = require('mongodb').MongoClient;

let query = {};
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  let db = client.db('video');
  let cursor = db.collection('movies').find(query)
  console.log(typeof cursor);
  cursor.forEach((doc) => {
    console.log(doc.title + " released in the year " + doc.year);
  }, (err) => {
    if (err) {console.log('received an error');}
    client.close().then((fulfilled) => {
      console.log('db closed');
    })
    .catch((rejected) => {
      console.log('connection couldn\'t be closed');
    });
  })
});
