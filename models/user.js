const mongoose = require('mongoose'); 

const model = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    }
}); 

module.exports = new mongoose.model("User", model, 'users'); 