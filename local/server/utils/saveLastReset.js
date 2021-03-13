const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, "..", "lastReset.txt")

module.exports.saveLastReset = (date) => {
  fs.writeFile(FILE_PATH, date, (err) => {
    if (err) {
      console.log(`Unable to write to lastReset.txt: ${err}`);
    }
  })
};