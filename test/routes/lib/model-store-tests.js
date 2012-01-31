var vows = require('vows'),
    assert = require('assert');

var modelStore = require('../../../routes/lib/model-store.js');
var db = require('../../../routes/lib/mongo.js').db;
var _ = require('underscore');

db.dropDatabase();

var liftModelName = 'lifts';
vows.describe('Saving lifts').addBatch({
    'Saving empty array is successful':{
        topic:function () {
            var topicThis = this;
            modelStore.saveModels(liftModelName, 1, [], function () {
                modelStore.getModels(liftModelName, 1, topicThis.callback);
            });
        },
        'saved array is retrieved when queried':function (err, lifts) {
            assert.equal(lifts.length, 0);
        }
    },
    'Single lift can be saved':{
        topic:function () {
            var topicThis = this;
            modelStore.saveModels(liftModelName, 1, [
                {
                    id:3,
                    name:'squat'
                }
            ], function () {
                modelStore.getModels(liftModelName, 1, topicThis.callback);
            });
        },
        'saved lift is returned by getLift':function (err, lifts) {
            var matchingLifts = _.filter(lifts, function (lift) {
                return lift.id === 3 && lift.deviceId === 1;
            });
            assert.equal(matchingLifts.length, 1);
            assert.equal(matchingLifts[0].deviceId, 1);
            assert.equal(matchingLifts[0].id, 3);
        }
    },
    'Single lift can be updated':{
        topic:function () {
            var topicThis = this;
            modelStore.saveModels(liftModelName, 1, [
                {id:4, name:'squat', reps:5}
            ],
                function () {
                    modelStore.saveModels(liftModelName, 1, [
                        {id:4, name:'squat', reps:6}
                    ], function () {
                        modelStore.getModels(liftModelName, 1, topicThis.callback);
                    });
                });
        },
        'Lift is updated':function (err, lifts) {
            var matchingLifts = _.filter(lifts, function (lift) {
                return lift.id === 4 && lift.deviceId === 1;
            });

            assert.equal(matchingLifts.length, 1);
            assert.equal(matchingLifts[0].reps, 6);
        }
    }
}).export(module);
