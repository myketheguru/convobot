const menuObj = require('../issues')
const bank = require('../bank')

const execute = (user, msg) => {
    bank.db[user].stage = 1
    if (bank.db[user].name) {
        return [`Hello ${bank.db[user].name}! \nWelcome to Lagos State Emergency Service. \nPress any key to proceed`]
    } else {
        return [`Welcome to Lagos State Emergency Service. \nPlease tell us your Full Name`]
    }
}

exports.execute = execute