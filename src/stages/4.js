const fsn = require('fs')
const fs = require('fs-extra')
const { decryptMedia } = require('@open-wa/wa-automate');
const mime = require('mime-types')
const bank = require('../bank')
const stagesStore = require('../stages')

function execute (user, msg, fullMsg, client) {

    if (msg === '#') {
        bank.db[user].stage = 0
        return ['You have successfully cancelled the operation']
    }

    (async function () {

        
        if (fullMsg.mimetype) {
        const filename = `${fullMsg.t}.${mime.extension(fullMsg.mimetype)}`;
        const mediaData = await decryptMedia(fullMsg);
        const imageBase64 = `data:${fullMsg.mimetype};base64,${mediaData.toString(
            'base64'
            )}`;
            // await client.sendImage(
                //     fullMsg.from,
                //     imageBase64,
                //     filename,
                //     `You just sent me this ${fullMsg.type}`
                // );
                
                const dir = `./data/${fullMsg.from}/p`
                const desiredMode = 0o2775
                fs.ensureDir(dir, desiredMode)
                .then(() => {
                    fsn.writeFile(`${dir}/${filename}`, mediaData, function(err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log('The file was saved!');
                    });
                })
                .catch(err => console.log(err))
            }
        })()
    
    bank.db[user].stage = 5
    // stagesStore.steps[5].obj.execute(user, "")
    return [`Thank you. \nIs there anything else we should Know?`, ]
}

exports.execute = execute