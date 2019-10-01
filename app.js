const express = require('express'),
    path = require ('path'),
    bodyParser = require('body-parser'),
    http = require('http'),
    mongodb = require('mongodb'),
    mongoose = require('mongoose'),
    
    //init app
    app = express()
;

mongoose.connect('mongodb://localhost:27017/recruitdb');
let db = mongoose.connection;

//check connection
db.once('open', function(){
    console.log('connected to mongodb')
});

//check for db errors
db.on('error', function(err){
    console.log(err);
})

//Bring in models
var Recruits = require("./models/recruits");

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
//set public folder
app.use(express.static(path.join(__dirname, 'public')));

/*
app.use(express.static(__dirname));
*/

//load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'pug'); 



//postinfo route
app.post('/post-info', function(req, res){
    Recruits.find({}, function(err, recruits){
        let recruit = JSON.stringify(req.body);
        if(err){
            console.log(err + "some error")
        }
        else{
            res.render('post-info.pug', {
                pageTitle: 'Recruit Info',
                // for data from from submission
                recruitInfo: JSON.parse(recruit),
                fname: JSON.parse(recruit).fname

                //for data from recruitdb
                // recruitInfo: recruits
            });        
        }
    });
});

//get post-info route
app.get('/thanks', function(req, res){
    Recruits.find({}, function(err, recruits){
        if(err){
            console.log(err + "some error")
        }
        else{
            res.render('thanks.pug', {
                pageTitle: 'Recruit Info',
                //for data from recruitdb
                recruitInfo: recruits
            });        
        }
    });
});

//get single recruit
app.get('/recruitinfo/:id', function(req, res){
    Recruits.findById(req.params.id, function(err, recruit){
       if(err){
           console.log(err)
       }
       else{
           res.render('recruitinfo.pug', {
               pageTitle: 'Recruit Info',
               recruit: recruit
           });
       };
    });
});

//recruits route
app.get('/recruits', function(req, res){
    Recruits.find({}, function(err, recruits){
        // let recruit = JSON.stringify(req.body);
        if(err){
            console.log(err + "some error")
        }
        else{
            res.render('index.pug', {
                pageTitle: 'Recruits Info',
                // for data from from submission
                // recruitInfo: JSON.parse(recruit)

                //for data from recruitdb
                recruitInfo: recruits
            });        
        }
    });
});

app.post('/recruits', function(req, res){
    console.log(req.obj);                                                                  
    let recruit = new Recruits();
    recruit.title = req.body.title;
    recruit.fname = req.body.fname;
    recruit.lname = req.body.lname;
    recruit.dept = req.body.dept;
    recruit.level = req.body.level;
    recruit.workTitle = req.body.workTitle;
    recruit.workPlace = req.body.workPlace;
    recruit.lang = req.body.lang;
    recruit.hobby = req.body.hobby;


    recruit.save(function(err){
        if(err){
            console.log(err);
            return;
        }
        else{
            res.redirect('/thanks')
        }
    });
});

//load edit form 
app.get('/recruitinfo/edit/:id', function(req, res){
    Recruits.findById(req.params.id, function(err, recruit){
       if(err){
           console.log(err);
       }
       else{
           res.render('edit_recruitinfo.pug', {
               pageTitle: 'Edit Recruit Info',
               recruit: recruit
           });
       };
    });
});

app.post('/recruitinfo/edit/:id', function(req, res){
    console.log(req.obj);   
    let recruit = {};                                                       
    recruit.title = req.body.title;
    recruit.fname = req.body.fname;
    recruit.lname = req.body.lname;
    recruit.dept = req.body.dept;
    recruit.level = req.body.level;
    recruit.workTitle = req.body.workTitle;
    recruit.workPlace = req.body.workPlace;
    recruit.lang = req.body.lang;
    recruit.hobby = req.body.hobby;

    let query = {_id:req.params.id}

    Recruits.update(query, recruit, function(err){
        if(err){
            console.log(err);
            return; 
        }
        else{
            res.redirect('/recruits');
        }
    });
});

app.delete('/recruitinfo/:id', function(req, res){
    let query = {_id:req.params.id}
    Recruits.remove(query, function(err){
        if(err){
            console.log(err);
        }
        else{
            res.send('success');
        }
    });
});


//start server
app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', function(){
    console.log(`Server started on port 3000`);
});

//refer https://programmingmentor.com/post/save-form-nodejs-mongodb/

// var express = require('express'),
//     path = require ('path'),
//     app = express(),
//     bodyParser = require('body-parser'),
//     http = require('http'),
//     mongodb = require('mongodb'),
//     dbConn = mongodb.MongoClient.connect('mongod://localhost:27017');

//     app.use(bodyParser.urlencoded({ extended : false }));
//     app.use(express.static(__dirname));
//     //form handler
//     app.post('/post-info', function(req, res){
//         dbConn.then(function(db){
//             delete req.body._id; //safety reasons
//             db.collection('feedbacks').insertOne(req.body);
//         });
//         res.send('Data recieved: \n' + JSON.stringify(req.body));
//     });

//     app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0');
