'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const MessagesSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    message: String,
    room: { type: Schema.Types.ObjectId, ref: 'rooms' },
}, {timestamps: true})

mongoose.model('messages', MessagesSchema);

module.exports = MessagesSchema;