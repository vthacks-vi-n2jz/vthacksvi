const http = require('http');
const url = require('url');
const querystring = require('querystring');
const socketIO = require('socket.io');
const socketIOConnectionHandler = require('./requestHandlers').socketIoConnectionHandler;

function startServer(route, handle) {
    var server = http.createServer(onRequest);
    var io = socketIO(server);

    function onRequest(request, response) {
        var requestUrl = url.parse(request.url);
        const path = requestUrl.pathname.substring(1);
        response.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        });
        const parameters = querystring.parse(requestUrl.query);
        var requestType = request.method;
        route(requestType, path, parameters, handle, response);
    }
    io.on('connection', function (socket) {
        socketIOConnectionHandler(socket);
    });
    server.listen(8080);
}

exports.startServer = startServer;