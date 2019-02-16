const request = require('request');
const storage = require('node-persist');


async function setupStorage() {
    await storage.init();
    await storage.setItem('JointAccount', JSON.stringify({
        'balance': 1000,
    }));
    await storage.setItem('RM1Account', JSON.stringify({
        'balance': 1000,
    }));
    await storage.setItem('RM2Account', JSON.stringify({
        'balance': 1000,
    }));
    await storage.setItem('MerchantAccount', JSON.stringify({
        'balance': 1000,
    }));
}

setupStorage();


async function createJointAccount(responseToBeSent, parameters) {
    let id = parameters.id;
    let balance = parameters.balance;
    await storage.setItem(id, JSON.stringify({
        'balance': parseInt(balance),
    }));
    responseToBeSent.write(JSON.stringify({
        'id': id,
        'balance': parseInt(balance),
    }));
    responseToBeSent.end();
}

async function viewJointAccount(responseToBeSent, parameters) {
    let id = parameters.id;
    let accountData = await storage.getItem(id);
    console.log(accountData);
    responseToBeSent.write(accountData);
    responseToBeSent.end();
}

async function sentMoneyToMerchant(responseToBeSent, parameters) {
    let amount = parameters.amount;
    let members = parameters.members.split(",");
    let jointAccount = parameters.jointAccount;
    let merchantAccount = parameters.merchantAccount;
    let transferPromises = [];
    for (let member of members) {
        await transfer(member, jointAccount, amount / members.length);
    }
    console.log(await storage.getItem('RM1Account'));
    console.log(await storage.getItem('RM2Account'));
    console.log(await storage.getItem('JointAccount'));
    console.log(await storage.getItem('MerchantAccount'));
    let transferConfirmation = await transfer(jointAccount, merchantAccount, amount);
    responseToBeSent.write(transferConfirmation);
    responseToBeSent.end();
}

async function transfer(source, destination, amount) {
    let sourceBalance = await storage.getItem(source);
    let destBalance = await storage.getItem(destination);
    await storage.setItem(source, JSON.stringify({"balance": JSON.parse(sourceBalance).balance - amount}));
    await storage.setItem(destination, JSON.stringify({"balance": JSON.parse(destBalance).balance + amount}));
    return "success!";
}




exports.createJointAccount = createJointAccount;
exports.viewJointAccount = viewJointAccount;
exports.sendMoneyToMerchant = sentMoneyToMerchant;