const fsn = require('fs')
const fs = require('fs-extra')
const { create, Client } = require('@open-wa/wa-automate');
const express = require('express')

const { db } = require('./src/bank')
const stages = require('./src/stages')

const app = express()
app.use(express.json())
const PORT = 8082;

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

app.get('/all-chats', (req, res) => {
  res
})

function start(client) {
  app.use(client.middleware);
  app.listen(PORT, function () {
    console.log(`\n• Listening on port ${PORT}!`);
  });

    client.onMessage(async message => {
      console.log('author',message.from);
    let resp = stages.steps[getStage(message.from)].obj.execute(
      message.from,
      message.body,
      message,
      client
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

  // const config = {
  //   sessionId: "Emergency_response",
  //   useChrome: true,
  // restartOnCrash: start,
  // headless:false,
  // throwErrorOnTosBlock:true,
  // qrTimeout:0,   //set to 0 to wait forever for a qr scan
  // authTimeout:0, //set to 0 to wait forever for connection to phone
  // killProcessOnBrowserClose: true,
  // autoRefresh:true, //default to true
  // safeMode: true,
  // disableSpins: true,
  // hostNotificationLang: 'en-gb',
  // viewport: {
  //   // width: 1920,
  //   height: 1200
  // },
  // popup: 3012,
  // defaultViewport: null,
  // url: "https://github.com/heroku/heroku-buildpack-google-chrome.git",
  // }

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