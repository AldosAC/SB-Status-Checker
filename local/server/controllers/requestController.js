const net = require('net');
const { testURL } = require('../../../config.js');
const { sendAlert } = require('./messageController.js');
const { log } = require('./logController.js')
const { timeStamp } = require('../utils/timeStamp.js');
const { saveLastReset } = require('../utils/saveLastReset.js');
const { loadLastReset } = require('../utils/loadLastReset.js');
const { validateLastResetFile } = require('../utils/validateLastResetFile.js');
const { randomData } = require('../utils/randomData.js');

const serverURL = '162.62.80.186';

const requestURL = serverURL;
const requestPort = 4000;
let lastReset = validateLastResetFile() 
? loadLastReset() 
: 'Unknown';

console.log(`lastReset: ${Date(lastReset)}`);

let status = '';
let statusCounter = 0;

const toggleStatus = (status, currStatus) => {
  if (status !== currStatus && currStatus !== '') {
    let message = `${timeStamp()} - Status changed: ${status}`

    if (status === 'ONLINE') {
      lastReset = Date.now();
      saveLastReset(lastReset);
    }

    log(message);
    console.log(message);
    sendAlert(status);
  }
  return status;
}

const statusCheck = (status, counter) => {
  if (counter >= 0) {
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
  queueRequest((Math.random() * (80 - 40) + 40) * 1000);
}

const serverIsOffline = () => {
  status = toggleStatus(`OFFLINE`, status);
  statusCounter = statusCheck(status, statusCounter);
  queueRequest((Math.random() * (12.5 - 7.5) + 7.5) * 1000);
}

const queueRequest = (timeout) => {
  setTimeout(() => {
    const connection = new net.Socket();
    connection.setTimeout(5000);
    connection.on('connect', () => {
      serverIsOnline();
      connection.send(randomData());
      connection.destroy();
    });
    connection.on('error', (err) => {
      serverIsOffline();
    })
    connection.on('timeout', (err) => {
      serverIsOffline();
    })
    connection.connect({ host: requestURL, port: requestPort });

  }, timeout)
}

const getStatus = () => {
  return { status, lastReset };
}

queueRequest(0);

module.exports = {
  getStatus,
  queueRequest
}