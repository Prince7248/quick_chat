const  mongoose = require('mongoose');

const chatSchema  =  new mongoose.Schema({
    members: {
        type: [
            {type: mongoose.Schema.Types.ObjectId,ref: "users"}

        ]
    },
    lastmessage : {
        type: mongoose.Schema.Types.ObjectId, ref: "messages"
    },
    unraedMessageCount: {
        type: Number,
        default: 0
    }


}, {timestamps: true});

module.exports = mongoose.model( "chats", chatSchema);