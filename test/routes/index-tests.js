var vows = require('vows'),
    assert = require('assert');

var mockEmailer = {
    sendMail:function (options, callback) {
        console.log(options);
        callback(null, 'status');
    }
};

var index = require('../../routes/index.js');

var _ = require('underscore');

var liftsToSave = [
    {
        name:'Squat',
        max:205
    },
    {
        name:'Press',
        max:120
    }
];

//vows.describe('Using lift endpoints').addBatch({
//    'No body':{
//        topic:function () {
//            var topicThis = this;
//            var req = {
//                params:{app:'wendler', deviceid:'deviceid', collection:'lifts'},
//                body:{}
//            };
//            var res = {send:function (out) {
//                topicThis.callback(null, out);
//            }};
//            index.saveModels(req, res);
//        },
//        'Response returns success':function (err, response) {
//            var responseObject = JSON.parse(response);
//            assert.isUndefined(responseObject.error);
//            assert.equal(responseObject.success, true);
//        }
//    },
//    'A lift is saved':{
//        topic:function () {
//            var topicThis = this;
//            var req = {
//                params:{app:'wendler', deviceid:'deviceid', collection:'lifts'},
//                body:{
//                    data:JSON.stringify(liftsToSave)
//                }
//            };
//            var res = {send:function (out) {
//                topicThis.callback(null, out);
//            }};
//            index.saveModels(req, res);
//        },
//        'With that lift':{
//            topic:function (err, response) {
//                var topicThis = this;
//                var getRequest = {params:{app:'wendler', deviceid:'deviceid', collection:'lifts'}};
//                var getResponse = {send:function (out) {
//                    topicThis.callback(null, out);
//                }};
//                index.getModels(getRequest, getResponse);
//            },
//            'The lift is returned':function (err, response) {
//                var objectResponse = JSON.parse(response);
//                assert.equal(objectResponse.success, true);
//                assert.equal(objectResponse.lifts.length, liftsToSave.length);
//                _.each(objectResponse.lifts, function (lift) {
//                    assert.isUndefined(lift._id);
//                });
//            }
//        }
//    }
//}).export(module);
//

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