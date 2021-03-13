const fs = require('fs');
const path = require('path');

const DIR_PATH = path.join(__dirname, "..");
const FILE_NAME = 'lastReset.txt';

module.exports.validateLastResetFile = () => {
  const fileList = fs.readdirSync(DIR_PATH);
  const fileExists = fileList.indexOf(FILE_NAME) > 0;

  console.log(`lastReset file validation: ${fileExists}`);

  return fileExists;
}