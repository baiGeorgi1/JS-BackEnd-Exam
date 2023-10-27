const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email address is requred!'],
        minLength: [10, 'Too short email!'],
        match: [/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/, 'Invalid email addres!']


    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: 3[true, 'Username must be at least 3 characters long!']
    },
    password: {
        type: String,
        required: [true, 'Password is requred!'],
        minLength: [4, 'Password is too short!']
    }
});

userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (this.password !== value) {
            throw new Error('Password missmatch!');
        }
    });

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

const User = mongoose.model('User', userSchema);
module.exports = User;