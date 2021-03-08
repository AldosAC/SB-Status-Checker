const { MAIL_USER, MAIL_PASS } = process.env;
const config = { user: MAIL_USER, pass: MAIL_PASS };
const send = require('gmail-send')(config);

let recipients = [
  'aldosac@gmail.com',
];

const sendAlert = (status) => {
  let subject = `AWS SB Update: Servers are ${status}`;
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
      console.log(`Update notification success`)
    })
    .catch((err) => {
      console.log(`Update notification fail: ${err}`)
    })
}

module.exports = {
  sendAlert
}