const http = require('http');
const url = require('url');
const querystring = require('querystring');
const socketIOConnectionHandler = require('./requestHandlers').socketIoConnectionHandler;

function startServer(route, handle) {
    var server = http.createServer(onRequest);

    function onRequest(request, response) {
        var requestUrl = url.parse(request.url);
        var path = requestUrl.pathname.substring(1);
        console.log(path);
        response.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        });
	path = path.substring(path.indexOf("/") + 1);
	console.log("PATH: " + path);
        const parameters = querystring.parse(requestUrl.query);
        var requestType = request.method;
        route(requestType, path, parameters, handle, response);
    }
    server.listen(8080);
}

exports.startServer = startServer;
