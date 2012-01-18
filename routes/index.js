var util = require('util');
exports.index = function (req, res) {
    res.render('index', { title:'Express' })
};

exports.exportLiftLog = function (req, res) {
    util.log("Exporting");
};

