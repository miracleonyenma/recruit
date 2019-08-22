

//refer https://programmingmentor.com/post/save-form-nodejs-mongodb/

var express = require('express'),
    path = require ('path'),
    app = express(),
    bodyParser = require('body-parser'),
    http = require('http'),
    mongodb = require('mongodb'),
    dbConn = mongodb.MongoClient.connect('mongod://localhost:27017');

    app.use(bodyParser.urlencoded({ extended : false }));
    app.use(express.static(__dirname));
    //form handler
    app.post('/post-info', function(req, res){
        dbConn.then(function(db){
            delete req.body._id; //safety reasons
            db.collection('feedbacks').insertOne(req.body);
        });
        res.send('Data recieved: \n' + JSON.stringify(req.body));
    });
    app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0');



// var express = require('express');
// var path = require('path');
// var bodyParser = require('body-parser');
// var mongodb = require('mongodb');

// var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017');

// var app = express();

// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static(__dirname));

// app.post('/post-info', function (req, res) {
//     dbConn.then(function(db) {
//         delete req.body._id; // for safety reasons
//         db.collection('feedbacks').insertOne(req.body);
//     });    
//     res.send('Data received:\n' + JSON.stringify(req.body));
// });


// app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0' );
