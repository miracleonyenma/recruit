const express = require('express'),
    app = express(),
    path = require("path");

app.use(express.static(__dirname));
app.get('/link', (req, res) => {
    // for(i in req.query){
    //     res.send(`${req.query}, ${req.query[i]}`);
    // }
    // res.status(404).send('File not found');
});



app.listen(3000, ()=>{
    console.log('server ready');
});