const config = require('../../../config.js');
const send = require('gmail-send')(config);
const { recipients } = require('../../../config.js')
const { log } = require('./logController.js')
const { timeStamp } = require('../utils/timeStamp.js');
const { getRecipients } = require('./recipientsController.js');

const sendAlert = (status) => {
  let subject = `SB Update: Servers are ${status}`;
  let text = `
  The Shadowbane servers are currently ${status}.

  Another email will be sent when the server status changes.

  To unsubscribe, visit https://sbstatus.joelcarpenter.net
  `

  let messagePool = [];

  for (let i = 0; i < recipients.length; i++) {
    messagePool.push(send({
      to: recipients[i],
      subject,
      text
    }));
  }

  Promise.all(messagePool)
    .then(() => {
      console.log(`${timeStamp()} - Update sent: ${status}`)
    })
    .catch((err) => {
      let message = `${timeStamp()} - Update notification fail: ${err}`;
      
      log(message);
      console.log(message)
    })
}

module.exports = {
  sendAlert
}