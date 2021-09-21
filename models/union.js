const mongoose = require('mongoose');

const UnionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name'],
        unique: true
    },
    namesf: {
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
    g_picture: {
            type: String,
    },
    chief: {
        type: String
    }
});

const Union = mongoose.model('union', UnionSchema);

module.exports = Union;