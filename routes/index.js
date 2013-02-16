require = global.require || require;

var util = require('util');
var _ = require('underscore');
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
            subject:'Big Lifts 5/3/1 Log Export',
            from:'biglifts@stefankendall.com',
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
            console.log(response);
            res.send('{"success":true}');
        });
    }
    else {
        res.send('{"success":true}');
    }

};

exports._sendEmail = function (options, callback) {
    postageapp.sendMessage(options, callback);
};