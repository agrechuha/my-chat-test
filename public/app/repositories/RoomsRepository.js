'use strict';

const BaseRepository = require('./BaseRepository');
const RoomsSchema = require('../models/Rooms');

class RoomsRepository extends BaseRepository {
    static modelName = 'Rooms';
    static modelSchema = RoomsSchema;
}

module.exports = RoomsRepository;