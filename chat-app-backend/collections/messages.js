const { Schema } = require('mongoose');
const mongoose = require('../loaders/mongoose');

const Message = mongoose.model('messages', {
    from: {
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    to: 
        {
            type: Schema.Types.ObjectId, 
            ref: 'user'
        }
    ,
    message: [String]
})

module.exports = Message;