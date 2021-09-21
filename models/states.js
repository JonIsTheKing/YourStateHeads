const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
    state: {
        type: String,
        required: [true, 'Please enter a name'],
        unique: true
    },
    s_code: {
        type: String,
        required: [true, 'Please enter short form'],
        maxLength: 2,
        unique: true
    },
    capital: {
        type: String,
        required: [true, 'What is the capital']
    },
    governor: {
        type: String,
        required: true
    },
    g_picture:{
        type: String,
        default: 'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg'
    },
    chief: {
        type: String,
        required: true
    },
    c_picture: {
        type: String,
        default: 'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg'
    }
});

const State = mongoose.model('states', StateSchema);

module.exports = State;