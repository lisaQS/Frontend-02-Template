let http = require("http");
let fs = require("fs");
let archiver = require("archiver");

let request = http.request({
    hostname: '127.0.0.1',
    port: 8882,        
    method: "POST",
    headers: {
        'Content-Type': 'application/octet-stream'
    }
}, response => {
    console.log(response);
});

const archive = archiver('zip', {
    zlib: { level: 9 }
});
   
archive.directory('./sample/', false);

archive.finalize();

archive.pipe(request);

