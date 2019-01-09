const functions = require('firebase-functions');
const express = require('express');
const engine = require('consolidate');
const firebase =require('firebase-admin');

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

  // Get a reference to the database service
var database = firebase.database();


const app = express();
app.engine('hbs', engine.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/time', (request, response) => {

    response.send(`${Date.now()}`);


});

app.post('/dataUpload', (request, response) => {

    var dataRef = database.ref("datapoints/");
    console.log(request);
    var dataPoint = request.body;
    dataPoint.timestamp = `${Date.now()}`;
    console.log(JSON.stringify(dataPoint));
    var dbDatapointRef = dataRef.push();
    dbDatapointRef.set(dataPoint);
    response.send("SUCCESSFUL DATA UPLOAD");

});



 exports.app = functions.https.onRequest(app);

// coments