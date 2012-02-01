var util = require('util');
var _ = require('underscore');
var modelStore = require('./lib/model-store.js');
var responseSanitizer = require('./lib/response-sanitizer.js');

exports.index = function (req, res) {
    res.render('index', { title:'Express' })
};

exports.saveLifts = function (req, res) {
    var id = req.params.id;
    var liftsJson = req.body.lifts ? JSON.parse(req.body.lifts) : [];
    util.log('Saving lifts for id: ' + id + " lifts: " + req.body.lifts);
    modelStore.saveModels('lifts', id, liftsJson, function (err, val) {
        var success = err === undefined;
        var responseObject = {
            success:success,
            error:err
        };
        res.send(JSON.stringify(responseObject))
    });
};

exports.getLifts = function (req, res) {
    var id = req.params.id;
    util.log('Getting lifts for id: ' + id);
    modelStore.getModels('lifts', id, function (err, liftsArray) {
        var responseObject = {
            success:true,
            lifts:responseSanitizer.removeObjectIdsFromArray(liftsArray)
        };
        res.send(JSON.stringify(responseObject));
    });
};