var db = require('./mongo').db;
var _ = require('underscore');
var async = require('async');

exports.saveModels = function (modelName, deviceId, models, allDoneCallback) {
    var modelCollection = db.collection(modelName);

    modelCollection.find({deviceId:deviceId}).toArray(function (err, existingModels) {
        var tasks = [];
        _.each(models, function (model) {
            model['deviceId'] = deviceId;
            var existingLift = _.find(existingModels, function (existingLift) {
                return existingLift.id === model.id
            });
            if (typeof(existingLift) === 'undefined') {
                tasks.push(function (nextTask) {
                    modelCollection.save(model, nextTask);
                });
            }
            else {
                for (var property in model) {
                    existingLift[property] = model[property];
                }
                tasks.push(function (nextTask) {
                    modelCollection.save(existingLift, nextTask);
                });
            }
        });

        async.parallel(tasks, allDoneCallback);
    });
};

exports.getModels = function (modelName, deviceId, callback) {
    var liftsCollection = db.collection(modelName);
    liftsCollection.find({deviceId:deviceId}).toArray(callback);
};