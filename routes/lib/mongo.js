var Mongolian = require("mongolian");
var mongoHqUrl = process.env['MONGOHQ_URL'] || 'mongodb://localhost/wendler';
exports.db = new Mongolian(mongoHqUrl);