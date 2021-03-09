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

  return ddb.get(query).promise()
    .then(({ Items }) => {
      return Items;
    })
    .catch((err) => {
      const message = `${timeStamp()} - Unable to get recipients - ${err}`
      log(message);
      console.log(message);
      return err;
    })
};

const addRecipient = (email) => {
  const query = {
    TableName,
    Item: {
      email
    }
  }

  console.log(`ddb: ${ddb}`);

  return ddb.put(query).promise()
    .then(() => {
      console.log(`Recipient added to DDB: ${email}`);
    })
    .catch((err) => {
      const message = `${timeStamp()} - Unable to add recipient ${email} - ${err}`
      log(message);
      console.log(message);
      return err;
    });
};

const removeRecipient = (email) => {
  const query = {
    TableName,
    Key: {
      email
    }
  }

  return ddb.delete(query).promise()
    .then(() => {
      console.log(`Recipient removed from DDB: ${email}`);
    })
    .catch((err) => {
      const message = `${timeStamp()} - Unable to remove recipient ${email} - ${err}`
      log(message);
      console.log(message);
      return err;
    });
}

module.exports = {
  getRecipients,
  addRecipient,
  removeRecipient
}