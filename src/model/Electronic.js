const { mongoose } = require('mongoose');

//TO DO add err messages
const electronicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [10, 'Name must be at least 2 characters!'],

    },
    type: {
        type: String,
        required: [true, 'Type is required!'],
        minLength: [2, 'Type must be at least 2 characters!'],


    },
    production: {
        type: Number,
        required: [true, 'Production is required!'],
        validate: {
            validator: (value) => 1900 >= value <= 2023,
            message: 'Production year must be between 1900 - 2023 year!'
        }
    },
    exploitation: {
        type: Number,
        required: [true, 'Exploitation  is required!'],
        validate: {
            validator: (value) => value >= 0,
            message: 'The exploitation must be possitive number!'
        }
    },
    damages: {
        type: String,
        required: [true, 'Damage is required!'],
        minLength: [10, 'Damage must be at least 10 characters long!']
    },
    image: {
        type: String,
        required: [true, 'Add image please!'],
        matcth: [/^[https?:]+\/\//gm, 'Invalid image addres!']
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        validate: {
            validator: (value) => value >= 0,
            message: 'The price must be possitive number!'
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description must be between 5 and 200 characters long!'],
        maxLength: [200, 'Description must be between 5 and 200 characters long!']

    },
    buyingList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Electronic = mongoose.model('Electronic', electronicSchema);
module.exports = Electronic;