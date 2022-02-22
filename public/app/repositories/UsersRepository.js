'use strict';

const BaseRepository = require('./BaseRepository');
const UsersSchema = require('../models/Users');

class UsersRepository extends BaseRepository {
    static modelName = 'Users';
    static modelSchema = UsersSchema;
}

module.exports = UsersRepository;