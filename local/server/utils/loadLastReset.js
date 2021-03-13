const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, "..", "lastReset.txt")

module.exports.loadLastReset = () => {
  return fs.readFileSync(FILE_PATH, { encoding: "utf-8"}).toString();
}