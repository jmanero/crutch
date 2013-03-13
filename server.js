
var Connect = require('connect');
var Optimist = require('optimist');
var Path = require('path');

var Proxy = require('./proxy');

var options = Optimist
	.alias('t', 'target')
	.alias('p', 'port')
	.alias('l', 'local')
	.boolean('l')
	['default']('t', __dirname)
	['default']('p', 8081)
	['default']('l', false)
	['default']('proxyport', 8443)
	.argv;

var server = Connect();
server.use('/pub', Connect.static(Path.resolve(__dirname, options.target)));

if(options.proxyhost) {
	server.use(Proxy.create({
		host : options.proxyhost,
		port : options.proxyport,
		bind : false,
	}));
}

server.listen(options.port, (options.local ? "127.0.0.1" : null), function() {
	console.log("Listening on " + (options.local ? "localhost:" : "*:") + options.port);
});
