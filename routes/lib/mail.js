var nodemailer = require('nodemailer');
nodemailer.SMTP = {
    host:'smtp.sendgrid.net',
    port:25,
    use_authentication:true,
    username:(new Buffer("")).toString("base64"),
    password:(new Buffer("")).toString("base64")
};

exports.mailer = nodemailer;