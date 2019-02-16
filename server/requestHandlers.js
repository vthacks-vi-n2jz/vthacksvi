const request = require('request');

function createAccountSettings() {
    let randomFixedInteger = function (length) {
        return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
    };
    return {
        "type": "Credit Card",
        "nickname": "string",
        "rewards": 0,
        "balance": 0,
        "account_number": "1234567891234567"
    }
}


function createAccount(responseToBeSent, parameters) {
    request.post({
        url: `http://api.reimaginebanking.com/customers/5c675a06322fa06b6779453c/accounts`,
        qs: {
            key: "62c6d069e5f36d88f921796deb57a33d",
        },
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "type": "Credit Card",
            "nickname": "string",
            "rewards": 0,
            "balance": 0,
            "account_number": "1234567891234567"
        })
    }, function (error, response, body) {
        console.log(body);
        responseToBeSent.write(body);
        responseToBeSent.end();
    });
}

exports.createAccount = createAccount;