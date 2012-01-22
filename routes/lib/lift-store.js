var db = require('./mongo').db;
var _ = require('underscore');

exports.saveLifts = function (deviceId, lifts) {
    var liftsCollection = db.collection('lifts');

    liftsCollection.find({deviceId:deviceId}).toArray(function (err, existingLifts) {
        _.each(lifts, function (lift) {
            lift['deviceId'] = deviceId;
            var existingLift = _.find(existingLifts, function (existingLift) {
                return existingLift.id === lift.id
            });
            if (typeof(existingLift) === 'undefined') {
                liftsCollection.save(lift);
            } else {
            }
        });
    });
};

exports.getLifts = function (deviceId, callback) {
    var liftsCollection = db.collection('lifts');
    liftsCollection.find({deviceId:deviceId}).toArray(callback);
};