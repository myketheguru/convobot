const bank = require('../bank')
const { issues } = require('../issues')

function execute (user, msg) {

    if (msg === '#') {
        bank.db[user].stage = 0
        return ['You have successfully cancelled the operation']
    }
    
    // if (msg === '#') {
        //     return stagesStore.steps[4].obj.execute(user, "")
        // }
        
    if (msg === '5') {
        bank.db[user].stage = 3
        return ['Please, briefly describe the situation']
    }

    if (issues[msg]) {
        bank.db[user].reqObj.issue = issues[msg].description
    } else {
        bank.db[user].reqObj.issue = msg
    }
    
    bank.db[user].stage = 4
    return [`Send us a Picture of the incident...`, "\n\nYou can send *#* to cancel this operation."]
}

exports.execute = execute