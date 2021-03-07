const express = require('express');
const axios = require('axios').create({ timeout: 5000, validateStatus: () => true });
const morgan = require('morgan');

const app = express();
const PORT = 3000;

const serverURL = 'http://62.62.80.186:4000';
const testURL = 'http://localhost:3001';

let requestURL = testURL;

let status = 'ONLINE';

app.use(morgan('dev'));

const toggleStatus = (status, currStatus) => {
  if (status !== currStatus) {
    // send alert
    console.log(`Status changed: ${status}`)
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

//Ping login server on loop
  // If timeout
    // invoke toggleStatus
    // wait 5 seconds and try again.
  // If successfull
    // invoke toggleStatus.
    // wait 30 seconds and try again.

queueRequest(5000);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Unable to connect: ${err}`);
  } else {
    console.log(`Server listening on port ${PORT}`);
  }
})

