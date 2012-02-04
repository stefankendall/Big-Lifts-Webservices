var express = require('express')
    , routes = require('./routes');

var app = module.exports = express.createServer();

app.configure('development', function () {
    app.use('/wendler', express.static(__dirname + '/wendler'));
    app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
});

app.configure('production', function () {
});

app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.logger());
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
});


app.get('/', routes.index);

app.post('/:app/:deviceid/:collection', routes.saveModels);
app.get('/:app/:deviceid/:collection', routes.getModels);

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
