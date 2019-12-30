var config = require("./config"); // to pull all the SECRETS

const accountSid = config.twilio.accountSecret;
const authToken = config.twilio.authToken;
const client = require("twilio")(accountSid, authToken);

function sendTextMessage(payload) {
  console.log("Test send message--" + accountSid + " " + payload);

  //disabled until Twilio gives auth back!

  // return client.messages
  //   .create({
  //     body: payload,
  //     from: config.twilio.phoneNumber,
  //     to: config.myNumber,
  //   })
  //   .then(message => console.log(message.sid));

  return true;
}

module.exports = sendTextMessage;
