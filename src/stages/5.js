const axios = require('axios')
const bank = require('../bank')

function execute (user, msg) {
    
    const body = bank.db[user].reqObj
    
    axios.post('https://quicksos-api.herokuapp.com/v1/message/', body)
    .then(res => {
        if (res) {
            console.log('Successfully Sent data to Desmond. Slap Desmond!');
            console.log(res.data)
        }
    })
    .catch(err => {
        console.log({
            text: 'There was a problem with this request. Slap Desmond!',
            error: err,
        });
    })
    
    
    if (!msg.toLowerCase().includes('no')  || !msg.toLowerCase().includes('nah')) {
        return ['Talk to us. What is it?']
    } else {
        bank.db[user].stage = 0
        bank.db[user].items = []
        return ['Thank you, for getting in touch.', '\nOur First responders will be on their way shortly']
    }


}

exports.execute = execute