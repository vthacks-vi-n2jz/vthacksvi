const server = require('./server.js');
const requestRouter = require('./requestRouter');
const requestHandler = require('./requestHandlers');

const handle = {
    go: requestHandler.getNearbyRestaurants,
};

server.startServer(requestRouter.route, handle);