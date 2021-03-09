const axios = require('axios').create({ timeout: 5000, validateStatus: () => true });
const { testURL } = require('../../../config.js');
const { sendAlert } = require('./messageController.js');
const { log } = require('./logController.js')
const { timeStamp } = require('../utils/timeStamp.js');

const serverURL = 'http://162.62.80.186:4000';

const requestURL = serverURL;

let status = '';
let statusCounter = 0;

const toggleStatus = (status, currStatus) => {
  if (status !== currStatus && currStatus !== '') {
    let message = `${timeStamp()} - Status changed: ${status}`

    log(message);
    console.log(message);
    sendAlert(status);
  }
  return status;
}

const statusCheck = (status, counter) => {
  if (counter >= 40) {
    let message = `${timeStamp()} - Status check: ${status}`

    log(message);
    console.log(message);
    return 0;
  } else {
    return counter + 1;
  }
}

const serverIsOnline = () => {
  status = toggleStatus('ONLINE', status);
  statusCounter = statusCheck(status, statusCounter);
  queueRequest(30000);
}

const serverIsOffline = () => {
  status = toggleStatus(`OFFLINE`, status);
  statusCounter = statusCheck(status, statusCounter);
  queueRequest(5000);
}

const queueRequest = (timeout) => {
  setTimeout(() => {
    axios.get(requestURL)
      .then((response) => {
        serverIsOnline();
      })
      .catch((err) => {
        err = err.message.split(' ')[0];
        
        if (err === 'Parse') {
          serverIsOnline();
        } else {
          serverIsOffline();
        }
      })
  }, timeout)
}

const getStatus = () => {
  return status;
}

queueRequest(0);

module.exports = {
  getStatus,
  queueRequest
}