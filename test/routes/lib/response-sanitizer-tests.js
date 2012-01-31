var vows = require('vows'),
    assert = require('assert');

var responseSanitizer = require('../../../routes/lib/response-sanitizer.js');

vows.describe('removeObjectsIdsFromArray test').addBatch({
    'empty array':{
        topic:function () {
            return responseSanitizer.removeObjectIdsFromArray([]);
        },
        'returns empty array':function (response) {
            assert.isEmpty(response);
        }
    },
    'array without objectids':{
        topic:function () {
            return responseSanitizer.removeObjectIdsFromArray([
                {name:'Squat'}
            ])
        },
        'returns same array':function (response) {
            assert.deepEqual([{name:'Squat'}], response);
        }
    },
    'array with objectids':{
        topic:function(){
            return responseSanitizer.removeObjectIdsFromArray([
                {name:'Squat', _id: '1234'}
            ])
        },
        'returns array without objectsid':function(response){
            assert.deepEqual([{name:'Squat'}], response)
        }
    }
}).export(module);
