let http = require('http');
let unzipper = require('unzipper');

http.createServer(function(req, res) {
    req.pipe(unzipper.Extract({path: '../server/public/'}));
}).listen(8082);