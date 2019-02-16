const request = require('request');

function createAccount(responseToBeSent, parameters) {
    request.post({
        url: `http://api.reimaginebanking.com/customers/5c675a06322fa06b6779453c/accounts`,
        qs: {
            key: "62c6d069e5f36d88f921796deb57a33d",
        }
    }, function (error, response, body) {
        responseToBeSent.write(body);
        responseToBeSent.end();
    });
}

exports.createAccount = createAccount;