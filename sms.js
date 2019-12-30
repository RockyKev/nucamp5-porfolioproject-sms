var config = require("./config"); // to pull all the SECRETS

// const accountSid = "AC060845f62b09d5ea107c05b171d75b43";
// const authToken = "747e0498ca712dd1423a9619e2a80dc2";
const accountSid = config.twilio.accountSecret;
const authToken = config.twilio.authToken;
const client = require("twilio")(accountSid, authToken);

function sendTextMessage(payload) {
  console.log("Test send message--" + accountSid + " " + payload);

  return client.messages
    .create({
      // body: "This is a new text message",
      body: payload,
      // from: "+12672147115",
      from: config.twilio.phoneNumber,
      to: "+12679784560"
    })
    .then(message => console.log(message.sid));
}

module.exports = sendTextMessage;
