var http = require('http');
var url = require('url');
var io = require('socket.io');
var fs = require('fs');

var server = http.createServer(function(request, response){
  console.log('Connection');

  var path = url.parse(request.url).pathname;
  switch(path) {
    case '/':
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write('Hello, World.');
      response.end();
      break;
    case '/display.html':
      // TODO: update
      fs.readFile(__dirname + path, function(error, data) {
        if (error){
          response.writeHead(404);
          response.write("opps this doesn't exist - 404");
        } else {
          response.writeHead(200, {"Content-Type": "text/html"});
          response.write(data, "utf8");
        }
        response.end();
      });
      break;
    default:
      response.writeHead(404);
      response.write("opps this doesn't exist - 404");
      response.end();
      break;
  }

});

server.listen(8001);
var serv_io = io.listen(server);

serv_io.sockets.on('connection', function(socket) {
  setInterval(function() {
    //TODO: push the new data here.
    socket.emit('volume', {'volume': 0.5});
  }, 500);
});
