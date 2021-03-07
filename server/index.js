const express = require('express');
const axios = require('axios').create({ timeout: 5000 });
const morgan = require('morgan');

const app = express();
const PORT = 3000;

let status = 'ONLINE';

app.use(morgan('dev'));

const toggleStatus = (status, currStatus) => {
  if (status !== currStatus) {
    // send alert
    return status;
  }
}

const request = (timeout) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios.get('162.62.80.186:4000')
        .then(resolve)
        .catch(reject)
    }, timeout)
  });
}

const queueNextRequest = () => {
  let time = 0;

  if (status === 'ONLINE') {
    time = 30000;
  } else {
    time = 5000;
  }
  
}

//Ping login server on loop
  // If timeout
    // invoke toggleStatus
    // wait 5 seconds and try again.
  // If successfull
    // invoke toggleStatus.
    // wait 30 seconds and try again.

  console.log(`Sending Axios Request`);
  axios.get('http://62.62.80.186:4000')
    .then((response) => {
      console.log(`Success: ${response}`)
    })
    .catch((err) => {
      console.log(`Failure: ${err}`)
    })

app.connect(PORT, (err) => {
  if (err) {
    console.log(`Unable to connect: ${err}`);
  } else {
    console.log(`Server listening on port ${PORT}`);
  }
})

