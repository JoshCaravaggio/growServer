const functions = require('firebase-functions');
const express = require('express');
const engine = require('consolidate');
const firebase =require('firebase-admin');

const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

  // Get a reference to the database service
var database = firebase.database();
function getCurrentData(){
    const ref = firebaseApp.database().ref('data');
    return ref.once('value').then(snap=>snap.val());

};

const app = express();
app.engine('hbs', engine.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/', (request, response) => {
    getCurrentData().then(data =>{
        var obj = {
            SensorDatapoint:{
                ID: "identifier"
            }
        };    
        database.push(obj);

        response.render('index', {data});
    });




});
app.get('/dataUpload', (request, response) => {



});



 exports.app = functions.https.onRequest(app);
