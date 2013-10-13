var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");
var port = process.env.PORT || 3000;
	app.listen(port);


http.createServer(function(request, response) {
    var urlPath = request.url;
    if (urlPath === '/') {
        urlPath = '/index.html';
    }
    var uri = url.parse(urlPath).pathname;

    var filename = path.join(process.cwd(), uri);
    fs.exists(filename, function(exists) {
        console.log(filename);
        if(!exists) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.end("404 Not Found");
            return;
        }

        fs.readFile(filename, "binary", function(err, file) {
            if(err) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.end(err + " : "+filename);
                return;

            }

            response.writeHead(200);
            response.end(file, "binary");
        });
    });
	}).listen(port);

console.log("Server running at "+process.env.port);
