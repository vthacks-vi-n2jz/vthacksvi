const server = require('./server.js');
const requestRouter = require('./requestRouter');
const requestHandler = require('./requestHandlers');

const handle = {
    createAccount: requestHandler.createAccount,
};

server.startServer(requestRouter.route, handle);