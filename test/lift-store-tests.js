var vows = require('vows'),
    assert = require('assert');

var liftStore = require('../routes/lib/lift-store.js');

vows.describe('Saving lifts').addBatch({
    'Saving empty array is successful':{
        topic:function () {
//            liftStore.saveLifts(1, []);
            return null;
        },
        'saved array is retrieved when queried':function (topic) {
//            assert.equal(liftStore.getLifts(1), null);
        }
    },
    'Single lift can be saved':{
        topic:function () {
            liftStore.saveLifts(1, [
                {name:'squat'}
            ]);

            liftStore.getLifts(1, this.callback);
        },
        'saved lift is returned by getLift':function (err, lifts) {
            console.log( lifts );
        }
    }
}).export(module);
