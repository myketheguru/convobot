const fsn = require('fs')
const fs = require('fs-extra')
const { create, Client } = require('@open-wa/wa-automate');

const { db } = require('./src/bank')
const stages = require('./src/stages')

// '👋 Hello! I\'m kelly. Emergency response assistant for Micheal. Please tell me your name'

// const getStage = user => stagesStore.db[user].stage

function getStage(user) {
  if (db[user]) {
      // see if user exists
      return db[user].stage;
  } else {
      // create a new user
      db[user] = {
          stage: 0,
          items: [],
      };
      return db[user].stage;
  }
}

function start(client) {
    client.onMessage(async message => {
      console.log('author',message.from);
    let resp = stages.steps[getStage(message.from)].obj.execute(
      message.from,
      message.body
    )

    for (let index = 0; index < Array(resp).length; index++) {
      const element = Array(resp)[index]
      client.sendText(message.from, element)
    }

    let currentStage = getStage(message.from)
    if (currentStage === 5) {
      client.getAllMessagesInChat(message.from, true, true).then(m => {
        let data = JSON.stringify(m)
        const dir = `./data/${message.from}`
        const desiredMode = 0o2775
        fs.ensureDir(dir, desiredMode)
          .then(() => {
            fsn.writeFileSync(`./data/${message.from}/${message.from}_${Date.now()}.json`, data);
          })
          .catch(err => {
            console.error(err)
          })
      })
    }

    });
  }

  const config = {
    sessionId: "Emergency_response",
    multiDevice: true, //required to enable multiDevice support
    authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
    blockCrashLogs: true,
    disableSpins: true,
    headless: true,
    hostNotificationLang: 'en-gb',
    logConsole: false,
    popup: true,
    qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
  }
  
  create(config).then(start);