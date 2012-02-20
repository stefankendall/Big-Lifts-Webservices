var fs = require('fs');
exports.postageapp = require('postageapp')(fs.readFileSync(__dirname + '/postageapp.secret', 'utf-8'));