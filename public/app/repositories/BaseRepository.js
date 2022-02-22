'use strict';

const mongoose = require('mongoose');

class BaseRepository {
    static modelName;
    static modelSchema;

    static getModel() {
        return mongoose.model(this.modelName, this.modelSchema);
    }

    static findById(id, options = {}, projections = null) {
        return this.getModel().findOne({_id: id}, projections, options)
    }

    static findOneByFilter(filter = {}, options = {}, projections = null) {
        return this.getModel().findOne(filter, projections, options)
    }

    static findAll(filter = {}) {
        return this.getModel().find(filter);
    }

    static async create(object, options = {}) {
        return this.getModel().create(object);
        // let model = this.getModel();
        // let newModel = new model(object);
        // return newModel.save((err, result) => callback(err, result));
    }

    static insertMany(objects, callback = () => {}, options = {}) {
        let model = this.getModel();
        return model.insertMany(objects, options, (err, result) => callback(err, result));
    }

    static updateOne(id, newData, callback = () => {}, options = {}) {
        return this.getModel().updateOne({_id: id}, {$set: newData}, options, (err, result) => callback(err, result))
    }

    static updateAll(filter, newData, callback = () => {}, options = {}) {
        return this.getModel().updateMany(filter, {$set: newData}, options, (err, result) => callback(err, result))
    }

    static deleteOne(id, callback = () => {}, options = {}) {
        return this.getModel().deleteOne({_id: id}, options, (err, result) => callback(err, result))
    }

    static deleteOneByFilter(filter, callback = () => {}, options = {}) {
        return this.getModel().deleteOne(filter, options, (err, result) => callback(err, result))
    }

    static deleteAllByFilter(filter, callback = () => {}) {
        return this.getModel().remove(filter, (err, result) => callback(err, result))
    }

    static getIndexes(filter) {
        return this.getModel().collection.getIndexes();
    }

    static dropIndex(index) {
        return this.getModel().collection.dropIndex(index);
    }
}

module.exports = BaseRepository;