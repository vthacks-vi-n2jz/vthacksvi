const server = require('./server.js');
const requestRouter = require('./requestRouter');
const requestHandler = require('./requestHandlers');

const handle = {
    createJointAccount: requestHandler.createJointAccount,
    viewJointAccount: requestHandler.viewJointAccount,
    sendMoneyToMerchant: requestHandler.sendMoneyToMerchant,
};

server.startServer(requestRouter.route, handle);