const express = require('express');
const { getStatus } = require('./controllers/requestController.js');
const { addRecipient, removeRecipient } = require('./controllers/recipientsController.js');
const { sendRegistrationConfirmation, sendRemoveConfirmation } = require('./controllers/messageController.js');
const { log } = require('./controllers/logController.js');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = 3658;

const corsOptions = {
  origin: [
    'https://sbstatus.joelcarpenter.net'
  ],
  methods: [
    'GET',
    'POST',
    'DELETE'
  ]
}

// app.use(morgan('dev'));
app.use(cors(corsOptions));

app.get(`/api/status`, (req, res) => {
  res.send(getStatus());
})

app.post('/api/recipients', (req, res) => {
  const { email } = req.query;

  if (email) {
    addRecipient(email)
    .then(() => {
      sendRegistrationConfirmation(email);
      res.sendStatus(201);
    })
    .catch((err) => {
      const message = `Unable to add ${email} - ${err}`;
      log(message);
      console.log(message);
      res.setStatus(500).send(message);
    })
  } else {
    res.setStatus(404).send(`Invalid email query`)
  }
  
})

app.delete('/api/recipients', (req, res) => {
  const { email } = req.query;

  if(email) {
    removeRecipient(email)
      .then(() => {
        sendRemoveConfirmation(email);
        res.sendStatus(200);
      })
      .catch((err) => {
        const message = `Unable to delete ${email} - ${err}`;
        log(message);
        console.log(message);
        res.setStatus(500).send(message);
      })
  } else {
    res.setStatus(404).send(`Invalid email query`)
  }
})

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Unable to connect: ${err}`);
  } else {
    console.log(`Server listening on port ${PORT}`);
  }
})