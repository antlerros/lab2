var http = require('http');
var url = require('url');
var io = require('socket.io');
var fs = require('fs');
var tessel = require('tessel');
var ambientlib = require('ambient-attx4');


tessel.led[2].off();		

var server = http.createServer(function(request, response){

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
console.log('running at 192.168.1.101:8001...');
var serv_io = io.listen(server);


var ambient = ambientlib.use(tessel.port['A']);
ambient.on("ready", function(){
	ambient.setSoundTrigger(0.01);
	console.log('ready');
	serv_io.sockets.on('connection', function(socket){
		console.log('connected');

		ambient.on("sound-trigger",function(sounddata){
			

			console.log(sounddata.toFixed(8));
			setInterval(function(){
				socket.emit('volume', {'volume': sounddata.toFixed(8)});
			}, 500);
			
			if(sounddata > 0.1){
				tessel.led[2].toggle();
				setTimeout(function(){
					tessel.led[2].toggle();
				},200);
			}
		});

	});
});
