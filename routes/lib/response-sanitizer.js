var _ = require('underscore');
exports.removeObjectIdsFromArray = function (array) {
    var arrayWithoutObjectIds = [];
    _.each(array, function (object) {
        var objectCopy = {};
        for (var key in object) {
            if (key != "_id") {
                objectCopy[key] = object[key];
            }
        }
        arrayWithoutObjectIds.push(objectCopy);
    });
    return arrayWithoutObjectIds;
};
