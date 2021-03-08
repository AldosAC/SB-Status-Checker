const axios = require('axios').create({ timeout: 5000, validateStatus: () => true });
const { sendAlert } = require('./controllers/messageController.js');

const requestURL = 'http://162.62.80.186:4000';

let status = '';
let statusCounter = 0;

const toggleStatus = (status, currStatus) => {
  if (status !== currStatus && currStatus !== '') {
    sendAlert(status);
    console.log(`Status changed: ${status}`);
  }
  return status;
}

const statusCheck = (status, counter) => {
  let time = Date().split(' ')[4];

  if (counter >= 10) {
    console.log(`${time} - Status check: ${status}`);
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

queueRequest(5000);

module.exports = {
  getStaus,
  queueRequest
}