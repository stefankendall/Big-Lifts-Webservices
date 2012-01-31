var util = require('util');
var email = require('./lib/mail.js').mailer;
var csvExport = require('./lib/csv-export.js');
var modelStore = require('lib/model-store.js');

exports.index = function (req, res) {
    res.render('index', { title:'Express' })
};

exports.saveLifts = function (req, res) {
    var id = req.params.id;
    var liftsJson = req.body.lifts ? req.body.lifts : [];
    modelStore.saveModels('lifts', id, liftsJson, function (err, val) {
        res.send('{success:true}')
    });
};

exports.getLifts = function (req, res) {
    var id = req.params.id;
    modelStore.getModels(id, function(err, val){
        res.send('{success:true}');
    });
};

exports.exportLiftLog = function (req, res) {
    var liftLog = req.body.log;
    var emailAddress = req.body.email;

    if (typeof( liftLog ) !== 'undefined') {
        util.log(emailAddress + " - " + liftLog);
        var csv = csvExport.jsonToCsv(liftLog);

        email.send_mail(
            {
                sender:"export@wendler.mobi",
                to:emailAddress,
                subject:"Wendler 5/3/1 Log Export",
                body:"See log file attached."
            },
            function (err, success) {
                if (err) {
                    util.log(err);
                }
            });
    }
    else {
        throw new Error('Export lift log called without any data');
    }

    res.send('{success:true}')
};

