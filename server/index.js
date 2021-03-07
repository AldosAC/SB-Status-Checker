const express = require(express);
const axios = require(axios);
const morgan = require(morgan);

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

//Ping login server on loop
  // If timeout
    // invoke toggleStatus
    // wait 5 seconds and try again.
  // If successfull
    // invoke toggleStatus.
    // wait 30 seconds and try again.


app.connect(PORT, (err) => {
  if (err) {
    console.log(`Unable to connect: ${err}`);
  } else {
    console.log(`Server listening on port ${PORT}`);
  }
})

