var vows = require('vows'),
    assert = require('assert');

var mailer = require('../../../../routes/lib/email/mail.js').mailer;

vows.describe('sending email').addBatch({
    'Send empty email':{
        topic:function () {
            mailer.send_mail({
                sender:'wendler531@stefankendall.com',
                to: 'stefankendall@gmail.com',
                subject: "Vows test",
                body: 'Test body'
            }, this.callback)
        },
        'sends successfully':function (error, response) {
            assert.include(error.message, '200')
        }
    }
}).export(module);
