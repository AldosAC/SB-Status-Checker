const express = require('express');
const axios = require('axios').create({ timeout: 5000, validateStatus: () => true });
const morgan = require('morgan');
const config = require('../config.js');
const send = require('gmail-send')(config);

const app = express();
const PORT = 3000;

const serverURL = 'http://62.62.80.186:4000';
const testURL = 'http://localhost:3001';

let requestURL = serverURL;

let status = 'ONLINE';
let recipients = [
  'aldosac@gmail.com',
  '8166542253@vtext.com'
];

app.use(morgan('dev'));

const sendAlert = (status) => {
  let subject = `SB Update: Servers are ${status}`;
  let text = `
  The Shadowbane servers are currently ${status}.

  Another email will be sent when the server status changes.

  Brought to you by SB Status Checker!
  `

  let messagePool = [];

  for (let i = 0; i < recipients.length; i++) {
    messagePool.push(send({
      to: recipients[i],
      subject,
      text
    }));
  }

  Promise.all(messagePool)
    .then(() => {
      console.log(`Update notification success`)
    })
    .catch((err) => {
      console.log(`Update notification fail: ${err}`)
    })
}

const toggleStatus = (status, currStatus) => {
  if (status !== currStatus) {
    sendAlert(status);
    console.log(`Status changed: ${status}`);
  }
  return status;
}

const queueRequest = (timeout) => {
  setTimeout(() => {
    axios.get(requestURL)
      .then((response) => {
        status = toggleStatus('ONLINE', status);
        queueRequest(30000);
      })
      .catch((err) => {
        status = toggleStatus(`OFFLINE`, status);
        queueRequest(5000);
      })
  }, timeout)
}

queueRequest(5000);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Unable to connect: ${err}`);
  } else {
    console.log(`Server listening on port ${PORT}`);
  }
})

