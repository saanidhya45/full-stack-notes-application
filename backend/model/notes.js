const mongoose = require('mongoose');


const notesSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",   // this should match your User model name
        required: true
    }
}, {timestamps: true});

// create a new model

const Notes = mongoose.model('notes', notesSchema);


module.exports = Notes;