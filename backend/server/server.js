const http = require('http');
const url = require('url');
const querystring = require('querystring');
const socketIOConnectionHandler = require('./requestHandlers').socketIoConnectionHandler;

function startServer(route, handle) {
    var server = http.createServer(onRequest);

    function onRequest(request, response) {
        var requestUrl = url.parse(request.url);
        var path = requestUrl.pathname.substring(1);
        response.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        });
        const parameters = querystring.parse(requestUrl.query);
	console.log("PATH1: " + path);
	path = path.substring(path.indexOf("/") + 1);
	console.log("PATH2: " + path);
        var requestType = request.method;
        route(requestType, path, parameters, handle, response);
    }
    server.listen(8080);
}

exports.startServer = startServer;
