const express = require('express');
const morgan = require('morgan');
const { getStatus } = require('./controllers/requestController.js');
const { getRecipients, addRecipient, deleteRecipient } = require('./controllers/recipientsController.js');
const { log } = require('./controllers/logController.js');

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

app.post('/api/recipients', (req, res) => {
  const { email } = req.query;

  addRecipient(email)
    .then(() => {
      res.send(201);
    })
    .catch((err) => {
      const message = `Unable to add ${email} - ${err}`;
      log(message);
      console.log(message);
      res.setStatus(500).send(message);
    })
})

app.delete('/api/recipients', (req, res) => {
  const { email } = req.query;

  deleteRecipient(email)
    .then(() => {
      res.send(200);
    })
    .catch((err) => {
      const message = `Unable to delete ${email} - ${err}`;
      log(message);
      console.log(message);
      res.setStatus(500).send(message);
    })
})

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Unable to connect: ${err}`);
  } else {
    console.log(`Server listening on port ${PORT}`);
  }
})