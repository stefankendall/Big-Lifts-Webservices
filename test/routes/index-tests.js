var vows = require('vows'),
    assert = require('assert');

var index = require('../../routes/index.js');
var db = require('../../routes/lib/mongo.js').db;
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

vows.describe('Using lift endpoints').addBatch({
    'Saving lifts returns success response':{
        topic:function () {
            db.dropDatabase();
            var topicThis = this;
            var req = {
                params:{id:'deviceid'},
                body:{}
            };
            var res = {send:function (out) {
                topicThis.callback(null, out);
            }};
            index.saveLifts(req, res);
        },
        'Response returns success':function (err, response) {
            var responseObject = JSON.parse(response);
            assert.isUndefined(responseObject.error);
            assert.equal(responseObject.success, true);
        }
    },
    'Saved lifts can be returned':{
        topic:function () {
            db.dropDatabase();
            var topicThis = this;
            var req = {
                params:{id:'deviceid'},
                body:{
                    lifts:liftsToSave
                }
            };
            var res = {send:function (out) {
                var getRequest = {params:{id:'deviceid'}};
                var getResponse = {send:function (out) {
                    topicThis.callback(null, out);
                }};
                index.getLifts(getRequest, getResponse);
            }};
            index.saveLifts(req, res);
        },
        'All lifts are returned':function (err, response) {
            var objectResponse = JSON.parse(response);
            assert.equal(objectResponse.success, true);
            assert.equal(objectResponse.lifts.length, liftsToSave.length);
            _.each(objectResponse.lifts, function(lift){
                assert.isUndefined(lift._id);
            });
        }
    }
}).export(module);
