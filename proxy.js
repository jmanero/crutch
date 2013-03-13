var HTTP = require('http');
var URL = require('url');
var Util = require('util');

exports.create = function(options) {
	options = options || {};
	
	var host = options.host || '127.0.0.1';
	var port = options.port || 5984;
	var bind = options.bind || '127.0.0.1';
	var secure = (typeof options.secure === 'undefined' ? true : !!options.secure);
	
	
	return function(req, res, next) {
		var req_host = req.headers.host;
		req.headers.host = host + ':' + port;
		
		var us_req = HTTP.request({
			host : host,
			port : port,
			localAddress : bind,
			method : req.method,
			path : req.url,
			headers : req.headers
		}, function(us_res) {
			console.log("HTTP " + us_res.httpVersion + ": " + us_res.statusCode);
			console.log(Util.inspect(us_res.headers));
			
			if(us_res.headers.location) {
				var location_url = URL.parse(us_res.headers.location);
				if(location_url.hostname === "127.0.0.1") {
					location_url.host = req_host;
					location_url.protocol = (secure ? "https" : "http");
				}
				
				us_res.headers.location = URL.format(location_url);
			}
			
			res.writeHead(us_res.statusCode, us_res.headers);
			us_res.pipe(res);
		});
		
		req.pipe(us_req);
	};
};
