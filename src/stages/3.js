const bank = require('../bank')

function execute (user, msg) {

    if (msg === '#') {
        bank.db[user].stage = 0
        return ['You have successfully cancelled the operation']
    }

    // if (msg === '#') {
    //     return stagesStore.steps[4].obj.execute(user, "")
    // }
    
    bank.db[user].stage = 4
    return [`Send us a Picture of the incident...`, "\n\nYou can send *#* to cancel this operation."]
}

exports.execute = execute