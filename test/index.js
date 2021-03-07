// This server is used to test how the app handles responses to its network requests

const express = require(`express`);
const morgan = require(`morgan`);

const app = express();
const PORT = 3001;

app.use(morgan(`dev`));

app.get(`/200`, (req, res) => {
  res.sendStatus(200);
})

app.get(`/300`, (req, res) => {
  res.sendStatus(300);
})

app.get(`/400`, (req, res) => {
  res.sendStatus(400);
})

app.get(`/500`, (req, res) => {
  res.sendStatus(500);
})

app.connect(PORT, (err) => {
  if (err) {
    console.log(`Unable to connect: ${err}`);
  } else {
    console.log(`Server listening on port ${PORT}`);
  }
});