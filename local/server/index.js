const express = require('express');
const { getStatus } = require('./controllers/requestController.js');
const { getRecipients, addRecipient, removeRecipient } = require('./controllers/recipientsController.js');
const { log } = require('./controllers/logController.js');
const headers = require('./headers.js');
const morgan = require('morgan');

const app = express();
const PORT = 3658;

// app.use((req, res, next) => {
//   res.set(headers);
//   next();
// })

app.use(morgan('dev'));

app.get(`/api/status`, (req, res) => {
  res.send(getStatus());
})

app.post('/api/recipients', (req, res) => {
  const { email } = req.query;

  if (email) {
    addRecipient(email)
    .then(() => {
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