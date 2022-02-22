const mongoose = require('mongoose');

const state = {
    db: null
};

exports.connect = function (url, dbName, done) {
    if (state.db) {
        return done();
    }

    mongoose.connect(url, { dbName: dbName, useNewUrlParser: true }, function (err, db) {
        if (err) {
            return done(err);
        }
        state.db = db;
        return done();
    })
}

exports.get = function () {
    return state.db;
}