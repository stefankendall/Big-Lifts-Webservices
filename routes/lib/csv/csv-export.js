var _ = require('underscore');
exports.jsonToCsv = function (liftList) {
    var csvString = "";
    var headerWritten = false;
    for (var i = 0; i < liftList.length; i++) {
        var lift = liftList[i];
        if (!headerWritten) {
            csvString += buildHeader(lift) + '\n';
            headerWritten = true;
        }

        var rowValues = [];
        for (var property in lift) {
            var value = lift[property];
            if (typeof(value) === "string") {
                value = '"' + value + '"';
            }
            rowValues.push(value);
        }
        csvString += rowValues.join(',') + '\n';
    }

    return csvString;
};

function buildHeader(lift) {
    var headers = [];
    for (var property in lift) {
        headers.push(property);
    }

    return headers.join(',');
}