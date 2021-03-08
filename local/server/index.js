const express = require('express');
const morgan = require('morgan');
const { getStatus } = require('./controllers/requestController.js');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));

app.get(`/api/status`, (req, res) => {
  res.send(getStatus());
})

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Unable to connect: ${err}`);
  } else {
    console.log(`Server listening on port ${PORT}`);
  }
})