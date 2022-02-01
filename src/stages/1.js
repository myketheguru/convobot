const menuObj = require('../issues')
const bank = require('../bank')

const execute = (user, msg) => {
    bank.db[user].name = msg
    bank.db[user].stage = 2
    // bank.db[user].items.push(menuObj.menu[msg])

    if (bank.db[user].name) {
        return [`Where are you reaching us from? Give us an address.`]
    }
    return [`Hello ${msg}\nWhere are you reaching us from? Give us an address.`]
}

exports.execute = execute