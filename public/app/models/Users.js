'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const UsersSchema = new Schema({
    username: {
        type: String,
        validate: {
            validator: function (text) {
                return text.trim();
            },
            message: 'Имя должно быть заполнено'
        },
        unique: true,
    },
}, {timestamps: true})

mongoose.model('users', UsersSchema);

module.exports = UsersSchema;