const server = require('./server.js');
const requestRouter = require('./requestRouter');
const requestHandler = require('./requestHandlers');

const handle = {
    createJointAccount: requestHandler.createJointAccount,
    viewJointAccounts: requestHandler.viewJointAccounts,
    viewJointAccount: requestHandler.viewJointAccount,
    transferToJointAccount: requestHandler.transferToJointAccount,
};

server.startServer(requestRouter.route, handle);