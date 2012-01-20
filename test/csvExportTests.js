var vows = require('vows'),
    assert = require('assert');

var csvExport = require('../routes/lib/csvExport');

vows.describe('Exporting JSON to a CSV file').addBatch({
    'Empty array':{
        topic:function () {
            return csvExport.jsonToCsv([])
        },
        'converts empty list into empty string':function (csv) {
            assert.equal(csv, '');
        }
    },
    'One item in log':{
        topic:function () {
            return csvExport.jsonToCsv([
                {
                    max:300,
                    reps:5,
                    expectedReps:3,
                    week:2,
                    cycle:1,
                    liftName:'squat'
                }
            ]);
        },
        'converts one object in list into header and row':function (csv) {
            assert.equal(csv,
                'liftName,max,reps,expectedReps,week,cycle\n' +
                    'squat,300,5,3,2,1');
        }
    }
}).export(module);
