const fs = require('fs');
const path = require('path');
const LOG_PATH = path.join(__dirname, "..", "logs");

module.exports.log = (message) => {
  const todaysDate = new Date();
  const logFile = `${LOG_PATH}/${todaysDate.getDate()}${todaysDate.getMonth()}${todaysDate.getFullYear()}`;

  fs.appendFile(logFile, `${message}\n`, (err) => {
    if (err) {
      console.log(`Unable to write to log file`);
    }
  });
}