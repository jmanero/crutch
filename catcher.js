var FS = require('fs');
var Path = require('path');

module.exports = function(pub) {
	var cache = {};
	
	function handle(req, res, next) {
		var target = Path.join(pub, Path.resolve(req.url));
		
		if(cache[target]) {
			console.log("Cache hit for " + target);
			
			res.setHeader('content-type', 'application/octet-stream');
			res.setHeader('content-length', cache[target].length);
			res.send(cache[target]);
			
			return;
		}
		
		FS.stat(target, function(err, st) {
			if(err) {
				if(err.code = 'ENOENT') {
					res.send(404);
					return;
				}
				
				res.send(500);
				return;
			}
			
			if(st.isDirectory()) {
				res.send(404);
				return;
			}
			
			res.setHeader('content-type', 'application/octet-stream');
			res.setHeader('content-length', st.size);
			var reader = FS.createReadStream(target);
			
			// Cache file
			console.log("Caching " + target);
			var buff = new Buffer(st.size);
			var curser = 0;
			reader.on('data', function(data) {
				data.copy(buff, curser);
				curser += data.length;
			});
			cache[target] = buff;
			
			reader.pipe(res);
		});
	}
	
	return handle;
}