let mongoose = require('mongoose');

//recruit schema
let recruitSchema = mongoose.Schema({
    title:{
        type: String,
        required: false
    },
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    dept:{
        type: String,
        required: true
    },
    level:{
        type: String,
        required: true
    },
    workPlace:{
        type: String,
        required: true
    },
    workTitle:{
        type: String,
        required: true
    },
    hobby:{
        type: String,
        required: true
    },
    lang:{
        type: String,
        required: true
    }
});

let Recruits = module.exports = mongoose.model('Recruits', recruitSchema);