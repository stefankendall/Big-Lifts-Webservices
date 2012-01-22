var db = require('./mongo').db;
var _ = require('underscore');
var async = require('async');

exports.saveLifts = function (deviceId, lifts, allDoneCallback) {
    var liftsCollection = db.collection('lifts');

    liftsCollection.find({deviceId:deviceId}).toArray(function (err, existingLifts) {
        var tasks = [];
        _.each(lifts, function (lift) {
            lift['deviceId'] = deviceId;
            var existingLift = _.find(existingLifts, function (existingLift) {
                return existingLift.id === lift.id
            });
            if (typeof(existingLift) === 'undefined') {
                tasks.push(function (nextTask) {
                    liftsCollection.save(lift, nextTask);
                });
            }
            else {
                for (var property in lift) {
                    existingLift[property] = lift[property];
                }
                tasks.push(function (nextTask) {
                    liftsCollection.save(existingLift, nextTask);
                });
            }
        });

        async.parallel(tasks, allDoneCallback);
    });
};

exports.getLifts = function (deviceId, callback) {
    var liftsCollection = db.collection('lifts');
    liftsCollection.find({deviceId:deviceId}).toArray(callback);
};