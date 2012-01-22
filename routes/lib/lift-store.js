var Mongolian = require("mongolian");
var mongoHqUrl = process.env['MONGOHQ_URL'] || 'mongodb://localhost/wendler';
var db = new Mongolian(mongoHqUrl);

var _ = require('underscore');

exports.saveLifts = function (id, lifts) {
    var liftsCollection = db.collection('lifts');

    _.each(lifts, function (lift) {
        lift['id'] = id;
        liftsCollection.save(lift);
    });
};

exports.getLifts = function (id, callback) {
    console.log("Get lift with " + id);
    var liftsCollection = db.collection('lifts');
    liftsCollection.find({id:id}).toArray(callback);
};