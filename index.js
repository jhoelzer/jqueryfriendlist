// makes server
var express = require('express');
//inputs express into file
var app = express();
// makes new express object
var http = require('http').Server(app);
//http server that hasn't been started yet (most use http/s)

app.use(express.static(__dirname + '/public'));
//use /public folder on http server; allows access to public server
//static files are unchanged

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
	// when it asks for that directory, it runs the function; the / is the directory/base directory because it's just the slash
	// when it asks for base directory, return the index.html
});

http.listen(process.env.PORT || 3000, function() {
	console.log('Listening on *:3000');
	//listens for events on that specific local port ("address") (3000 in this case)
	//env = environment values
});
