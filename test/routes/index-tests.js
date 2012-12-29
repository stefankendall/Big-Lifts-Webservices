var vows = require('vows'),
    assert = require('assert');

var index = require('../../routes/index.js');

vows.describe('Exporting lift log via email').addBatch({
    'Empty data':{
        topic:function () {
            var topicThis = this;
            var req = {
                body:{

                }
            };
            var res = {send:function (out) {
                topicThis.callback(null, out);
            }};
            index.email(req, res);
        },
        'Response returns success':function (err, response) {
            var responseObject = JSON.parse(response);
            assert.equal(responseObject.success, true);
        }
    },
    'Full data':{
        topic:function () {
            var topicThis = this;
            var req = {
                body:{
                    data:JSON.stringify(
                        [
                            {
                                liftName:'squat',
                                max:300,
                                reps:5,
                                expectedReps:3,
                                week:2,
                                cycle:1
                            }
                        ]),
                    email:'test@test.com'}
            };
            var res = {send:function (out) {
            }};

            index._sendEmail = function (options, callback) {
                topicThis.callback(null, options);
            };
            index.email(req, res);
        },
        'Sent options is populated':function (err, response) {
            var email = response.recipients;
            var attachments = response.attachments;
            var filename = Object.keys(attachments)[0];

            assert.include(filename, '.csv');
            assert.equal(email, "test@test.com")
        }
    }
}).export(module);