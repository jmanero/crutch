var Express = require('express');
var Optimist = require('optimist');
var Path = require('path');

var options = Optimist
	.alias('t', 'target')
	.alias('p', 'port')
	.alias('l', 'local')
	.boolean('l')
	['default']('t', __dirname)
	['default']('p', 8081)
	['default']('l', false)
	.argv;

var server = Express();
server.use(Express.logger());

server.use(Express.directory(Path.resolve(__dirname, options.target)));
server.use(Express.static(Path.resolve(__dirname, options.target)));

server.listen(options.port, (options.local ? "127.0.0.1" : null), function() {
	console.log("Listening on " + (options.local ? "localhost:" : "*:") + options.port);
});
