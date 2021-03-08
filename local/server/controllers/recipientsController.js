const AWS = require('aws-sdk');
const { log } = require('./logController.js')
const { timeStamp } = require('../utils/timeStamp.js');

AWS.config.update({
  region: 'us-west-2'
});

const ddb = new AWS.DynamoDB.DocumentClient();
const TableName = "SBStatusEmails"

const getRecipients = () => {
  const query = {
    TableName
  };

  return ddb.get(query)
    .then(({ Items }) => {
      return Items;
    })
};

const addRecipient = (emal) => {
  const query = {
    TableName,
    Item: {
      email
    }
  }

  return ddb.put(query)
    .then(() => {
      console.log(`Recipient added to DDB: ${email}`);
    })
    .catch((err) => {
      const message = `${timeStamp()} - Unable to add recipient ${email} - ${err}`
      log(message);
      console.log(message);
    });
};

module.exports = {
  getRecipients,
  addRecipient
}