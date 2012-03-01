var vows = require('vows'),
    assert = require('assert');

var csvExport = require('../../../../routes/lib/csv/csv-export.js');

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
                    liftName:'squat',
                    max:300,
                    reps:5,
                    expectedReps:3,
                    week:2,
                    cycle:1
                }
            ]);
        },
        'converts one object in list into header and row':function (csv) {
            assert.equal(csv,
                'liftName,max,reps,expectedReps,week,cycle\n' +
                    '"squat",300,5,3,2,1\n');
        }
    },
    'Log notes with commas':{
        topic:function () {
            return csvExport.jsonToCsv([
                {
                    liftName:'squat',
                    notes:'test,test',
                    max:300
                }
            ]);
        },
        'converts one object in list into header and row':function (csv) {
            assert.equal(csv,
                'liftName,notes,max\n' +
                    '"squat","test,test",300\n');
        }
    },
    'Multiple items in log':{
        topic:function () {
            return csvExport.jsonToCsv([
                {
                    liftName:'squat',
                    max:300,
                    reps:5,
                    expectedReps:3,
                    week:2,
                    cycle:1
                },
                {
                    liftName:'bench',
                    max:175,
                    reps:null,
                    expectedReps:3,
                    week:2,
                    cycle:1
                }
            ]);
        },
        'converts multiple object in list into header and row':function (csv) {
            assert.equal(csv,
                'liftName,max,reps,expectedReps,week,cycle\n' +
                    '"squat",300,5,3,2,1\n' +
                    '"bench",175,,3,2,1\n'
            );
        }
    }
}).export(module);
