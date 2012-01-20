var _ = require('underscore');
exports.jsonToCsv = function(liftList) {
    var csvString = "";
    _.each(liftList, function(lift){
        console.log( lift );
    });
    return csvString;
};