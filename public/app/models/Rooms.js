'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const RoomsSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: function (text) {
                return text.trim();
            },
            message: 'Название должно быть заполнено'
        },
        unique: true,
    },
    title: String
}, {timestamps: true})

mongoose.model('rooms', RoomsSchema);

module.exports = RoomsSchema;