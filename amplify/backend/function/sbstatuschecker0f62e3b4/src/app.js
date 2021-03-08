const express = require('express');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const { getStatus } = require('./controllers/requestController.js');

const app = express();
const PORT = 3000;

app.use(awsServerlessExpressMiddleware.eventContext());

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

module.exports = app
