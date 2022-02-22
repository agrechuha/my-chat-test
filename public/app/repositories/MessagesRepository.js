'use strict';

const BaseRepository = require('./BaseRepository');
const MessagesSchema = require('../models/Messages');

class MessagesRepository extends BaseRepository {
    static modelName = 'messages';
    static modelSchema = MessagesSchema;

    static findById(id, options = {}, projections = null) {
        return this.getModel().findOne({_id: id}, projections, options).populate('room').populate('user');
    }

    static findOneByFilter(filter = {}, options = {}, projections = null) {
        return this.getModel().findOne(filter, projections, options).populate('room').populate('user');
    }

    static findAll(filter = {}) {
        return this.getModel().find(filter).populate('room').populate('user').then();
    }
}

module.exports = MessagesRepository;