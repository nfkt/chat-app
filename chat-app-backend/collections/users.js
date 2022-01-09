const mongoose = require('../loaders/mongoose');

const User = mongoose.model('user', {
    name: String,
    password: String,
    friendsList: [String]
})

module.exports = User;