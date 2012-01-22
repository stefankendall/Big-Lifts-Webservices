var vows = require('vows'),
    assert = require('assert');

var liftStore = require('../routes/lib/lift-store.js');
var db = require('../routes/lib/mongo').db;
db.dropDatabase();

vows.describe('Saving lifts').addBatch({
    'Saving empty array is successful':{
        topic:function () {
            liftStore.saveLifts(1, []);
            liftStore.getLifts(1, this.callback);
        },
        'saved array is retrieved when queried':function (err, lifts) {
            assert.equal(lifts.size, 0);
        }
    },
    'Single lift can be saved':{
        topic:function () {
            liftStore.saveLifts(1, [
                {
                    id:3,
                    name:'squat'
                }
            ]);
            liftStore.getLifts(1, this.callback);
        },
        'saved lift is returned by getLift':function (err, lifts) {
            assert.equal(lifts.length, 1);
            assert.equal(lifts[0].deviceId, 1);
            assert.equal(lifts[0].id, 3);
        }
    }
}).export(module);
