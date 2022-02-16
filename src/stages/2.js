const bank = require('../bank')
const { issues } = require('../issues')

function execute (user, msg) {

    if (msg === '#') {
        bank.db[user].stage = 0
        return ['You have successfully cancelled the operation']
    }

    // if (msg !== '#') {
    //     return ['Send us a Picture of the incident...']
    // }
    
    let issuesList = "  *ISSUES*  \n\n"
    Object.keys(issues).forEach(value => {
        let element = issues[value]
        issuesList += `${value}: ${element.description} \n`
    })
    
    issuesList += '\n------------------- \n'
    
    bank.db[user].reqObj.address = msg
    
    bank.db[user].stage = 3
    return [`Tell us what happened \n_Send a number if it is any of the following_\n\n ${issuesList} \n\nYou can send *#* to cancel this operation.`]
}

exports.execute = execute