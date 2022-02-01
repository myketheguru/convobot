const bank = require('../bank')
const stagesStore = require('../stages')

function execute (user, msg) {

    if (msg === '#') {
        bank.db[user].stage = 0
        return ['You have successfully cancelled the operation']
    }
    
    bank.db[user].stage = 5
    // stagesStore.steps[5].obj.execute(user, "")
    return [`Thank you. \nIs there anything else we should Know?`, ]
}

exports.execute = execute