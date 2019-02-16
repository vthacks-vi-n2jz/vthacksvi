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


function createJointAccount(responseToBeSent, parameters) {
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

// for our ease of dev
function viewJointAccounts(responseToBeSent, parameters) {
    request({
        url: `http://api.reimaginebanking.com/customers/5c675a06322fa06b6779453c/accounts`,
        qs: {
            key: "62c6d069e5f36d88f921796deb57a33d",
        },
    }, function (error, response, body) {
        console.log(body);
        responseToBeSent.write(body);
        responseToBeSent.end();
    });
}

function viewJointAccount(responseToBeSent, parameters) {
    if (parameters.id === undefined) {
        responseToBeSent.write("bad customer id dude");
        responseToBeSent.end();
    }
    request({
        url: `http://api.reimaginebanking.com/accounts/${parameters.id}`,
        qs: {
            key: "62c6d069e5f36d88f921796deb57a33d",
        },
    }, function (error, response, body) {
        console.log(body);
        responseToBeSent.write(body);
        responseToBeSent.end();
    });
}

function transferToJointAccount(responseToBeSent, parameters) {
    if (parameters.idsList === undefined || parameters.amount === undefined || parameters.jointAccountId === undefined) {
        responseToBeSent.write("Need a list of ids and a valid amount and valid joint account id");
        responseToBeSent.end();
        return;
    }
    let transferPromises = [];
    idsList = parameters.idsList.split(",");
    amount = parseInt(parameters.amount);
    idsList.forEach(function (id) {
        transferPromises.push(new Promise(function (resolve) {
            request.post({
                url: `http://api.reimaginebanking.com/accounts/${id}/transfers`,
                qs: {
                    key: "62c6d069e5f36d88f921796deb57a33d",
                },
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "medium": "balance",
                    "payee_id": parameters.jointAccountId,
                    "transaction_date": (new Date()).toISOString().split('T')[0],
                    "status": "pending",
                    "description": "string",
                    "amount": amount
                })
            }, function (error, response, body) {
                resolve(body);
            });
        }));
    });
    Promise.all(transferPromises).then(function (bodies) {

        console.log(bodies.toString());
        responseToBeSent.write(bodies.toString());
        responseToBeSent.end();
    });
}

exports.createJointAccount = createJointAccount;
exports.viewJointAccounts = viewJointAccounts;
exports.viewJointAccount = viewJointAccount;
exports.transferToJointAccount = transferToJointAccount;