var vows = require('vows'),
    assert = require('assert');

var postageapp = require('../../../../routes/lib/email/mail.js').postageapp;

vows.describe('sending email').addBatch({
    'plaintext': {
        topic: function () {
            var options = {
                recipients: 'stefankendall@gmail.com',
                subject: 'Subject Line',
                from: 'export@wendler.mobi',
                content: {
                    'text/plain': "Hello, World!"
                }
            };
            postageapp.sendMessage(options, this.callback);
        },
        'sends successfully': function (error, response) {
            console.log(response);
            assert.equal(JSON.parse(response).response.status, "ok");
        }
    },
    'with attachment': {
        topic: function () {
            var attachmentData = "date,weight,reps\n" +
                "02/02/2011,145,6\n" +
                "02/04/2011,155,5\n";
            var options = {
                recipients: 'stefankendall@gmail.com',
                subject: 'Subject Line',
                from: 'export@wendler.mobi',
                content: {
                    'text/plain': "File attached."
                },
                attachments: {
                    'log.csv': {
                        'content_type': 'text/csv',
                        'content': (new Buffer(attachmentData)).toString("base64")
                    }
                }
            };
            postageapp.sendMessage(options, this.callback);
        },
        'sends successfully': function (error, response) {
            console.log(response);
            assert.equal(JSON.parse(response).response.status, "ok");
        }
    }
}).export(module);
