var Mongolian = require("mongolian");
var util = require('util');
var mongoHqUrl = process.env['MONGOHQ_URL'] || 'mongodb://localhost/wendler';
util.log( "Connecting to mongo: " + mongoHqUrl );
exports.db = new Mongolian(mongoHqUrl);