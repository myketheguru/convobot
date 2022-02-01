const bank = require('../bank')

function execute (user, msg) {
    bank.db[user].stage = 0
    bank.db[user].items = []
    return ['Thank you, for getting in touch.', '\nOur First responders will be on their way shortly']
}

exports.execute = execute