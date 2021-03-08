const express = require('express');
const morgan = require('morgan');
const { getStatus } = require('./controllers/requestController.js');
const { getRecipients, addRecipient, deleteRecipient } = require('./controllers/recipientsController.js');

const app = express();
const PORT = 3658;

app.use(morgan('dev'));

app.get(`/api/status`, (req, res) => {
  res.send(getStatus());
})

app.get('/api/recipients', (req, res) => {
  getRecipients()
    .then((recipients) => {
      res.send(recipients);
    })
    .catch((err) => {
      res.status(500);
      res.send(`Error getting recipients: ${err}`);
    })
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Unable to connect: ${err}`);
  } else {
    console.log(`Server listening on port ${PORT}`);
  }
})