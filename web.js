var http = require('http');
var port = process.env.PORT || 3000;
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(port, "0.0.0.0");
console.log('Server running on port ' + port);
