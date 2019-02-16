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
    members.forEach((member)=> {
       transferPromises.push(transfer(member, jointAccount, amount / members.length));
    });
    let transferConfirmations = await Promise.all(transferPromises);
    let dog = await storage.getItem("JointAccount");
    let transferConfirmation = await transfer(jointAccount, merchantAccount, amount);
    responseToBeSent.write(transferConfirmation);
    responseToBeSent.end();
}

async function transfer(source, destination, amount) {
    if (destination === "JointAccount" || source === "JointAccount") {
        console.log("hi");
    }
    let sourceBalance = await storage.getItem(source);
    let destBalance = await storage.getItem(destination);
    await storage.setItem(source, JSON.parse(sourceBalance).balance - amount);
    await storage.setItem(destination, JSON.parse(destBalance).balance + amount);
    let bals1 = await storage.getItem("JointAccount");
    return "success!";
}




exports.createJointAccount = createJointAccount;
exports.viewJointAccount = viewJointAccount;
exports.sendMoneyToMerchant = sentMoneyToMerchant;