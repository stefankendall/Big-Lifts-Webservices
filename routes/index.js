var util = require('util');
var email = require('./lib/mail.js').mailer;
var csvExport = require('./lib/csvExport.js');
exports.index = function (req, res) {
    res.render('index', { title:'Express' })
};

exports.exportLiftLog = function (req, res) {
    var liftLog = req.body.log;
    var emailAddress = req.body.email;

    var liftLogJson = JSON.parse(liftLog);
    util.log(emailAddress + " - " + liftLog);
    var csv = csvExport.jsonToCsv(liftLogJson);

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

    res.send('{success:true}')
};

