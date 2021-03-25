const config = require('../../../config.js');
const send = require('gmail-send')(config);
const { log } = require('./logController.js')
const { timeStamp } = require('../utils/timeStamp.js');
const { getRecipients } = require('./recipientsController.js');

const testMode = false;

const sendAlert = (status) => {
  let subject = `SB Update: Servers are ${status}`;
  let text = `
  The Shadowbane servers are currently ${status}.

  Another email will be sent when the server status changes.

  To unsubscribe, visit https://sbstatus.joelcarpenter.net
  `

  if(testMode) {
    console.log(`Test mode, no messages sent`);
  } else {
    getRecipients()
    .then((recipients) => {
      let messagePool = [];
      
      for (let i = 0; i < recipients.length; i++) {
        messagePool.push(send({
          to: recipients[i].email,
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
    })
    .catch((err) => {
      let message = `${timeStamp()} - Update notification fail: ${err}`;
      
      log(message);
      console.log(message)
    })
  }
}

const sendRegistrationConfirmation = (email) => {
  const subject = `SB Status Update - Registration confirmation`;
  const text = `
    You've been registered to receive Shadowbane server status updates with the email: ${email}

    That's it!  Emails will be sent out within seconds of the server status changing,
    so kick back and relax.

    If you'd like to unsubscribe, visit https://sbstatus.joelcarpenter.net
  `;

  return send({
    to: email,
    subject,
    text
  })
    .then(() => {
      console.log(`Confirmation email sent`);
    })
    .catch((err) => {
      console.log(`Unable to send confirmation email`);
    })
};

const sendRemoveConfirmation = (email) => {
  const subject = `SB Status Update - Unsubcribe confirmation`;
  const text = `
    You've been unsubscribed from Shadowbane status updates.

    If you'd like to resubscribe, visit https://sbstatus.joelcarpenter.net
  `;

  return send({
    to: email,
    subject,
    text
  })
    .then(() => {
      console.log(`Confirmation email sent`);
    })
    .catch((err) => {
      console.log(`Unable to send confirmation email`);
    })
}

module.exports = {
  sendAlert,
  sendRegistrationConfirmation,
  sendRemoveConfirmation
}