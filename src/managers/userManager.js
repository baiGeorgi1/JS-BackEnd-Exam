const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../constants');

const User = require('../model/User');

exports.login = async (email, password) => {

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid user or password!');
    }


    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid user or password!');
    }
    const token = await generateToken(user);
    return token;

};

exports.register = async (userData) => {
    const user = await User.findOne({ email: userData.email });

    if (user) {
        throw new Error('User with this email already exists!');
    }
    const newUser = await User.create(userData);
    const token = generateToken(newUser);
    return token;
};
async function generateToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    };
    const token = jwt.sign(payload, SECRET);
    return token;
}
