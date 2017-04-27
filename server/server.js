var http = require('http');
var url = require('url');

var server = http.createServer(function(request, response){
  console.log('Connection');

  var path = url.parse(request.url).pathname;
  switch(path) {
    case '/':
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write('Hello, World.');
      response.end();
      break;
    case '/display2.html':
      // TODO: update
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write('Hello, World.');
      response.end()
      break;
    default:
      response.writeHead(404);
      response.write("opps this doesn't exist - 404");
      response.end();
      break;
  }

});

server.listen(8001);