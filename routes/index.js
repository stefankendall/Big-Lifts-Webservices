require = global.require || require;

var util = require('util');
var _ = require('underscore');
var modelStore = require('./lib/model-store.js');
var responseSanitizer = require('./lib/response-sanitizer.js');
var postageapp = require('./lib/email/mail.js').postageapp;
var csvExport = require('./lib/csv/csv-export.js');

exports.index = function (req, res) {
    res.render('index', { title:'Express' })
};

exports.email = function (req, res) {
    var dataString = req.body.data;
    var emailAddress = req.body.email;

    if (dataString !== undefined && emailAddress !== undefined && dataString !== '') {
        var data = JSON.parse(req.body.data);

        util.log(emailAddress + " - " + JSON.stringify(data));
        var csv = csvExport.jsonToCsv(data);

        var options = {
            recipients:emailAddress,
            subject:'Wendler 5/3/1 Log Export',
            from:'wendler531@stefankendall.com',
            content:{
                'text/plain':"Log file attached."
            },
            attachments:{
                'log.csv':{
                    'content_type':'text/csv',
                    'content':(new Buffer(csv)).toString("base64")
                }
            }
        };

        exports._sendEmail(options, function (error, response) {
            res.send('{"success":true}');
        });
    }
    else {
        res.send('{"success":true}');
    }

};

exports.saveModels = function (req, res) {
    var app = req.params.app;
    var deviceId = req.params.deviceid;
    var collection = req.params.collection;

    var dataJson = req.body.data ? JSON.parse(req.body.data) : [];
    modelStore.saveModels(getCollectionName(app, collection), deviceId, dataJson, function (err, val) {
        var success = err === undefined;
        var responseObject = {
            success:success,
            error:err
        };
        res.send(JSON.stringify(responseObject))
    });
};

exports.getModels = function (req, res) {
    var app = req.params.app;
    var deviceId = req.params.deviceid;
    var collection = req.params.collection;
    modelStore.getModels(getCollectionName(app, collection), deviceId, function (err, liftsArray) {
        var responseObject = {
            success:true,
            lifts:responseSanitizer.removeObjectIdsFromArray(liftsArray)
        };
        res.send(JSON.stringify(responseObject));
    });
};

exports.deleteModel = function (req, res) {

};

exports._sendEmail = function (options, callback) {
    postageapp.sendMessage(options, callback);
};

function getCollectionName(app, collection) {
    return app + "_" + collection;
}