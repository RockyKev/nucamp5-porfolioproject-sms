const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//txt message contains
//timestamps
//message
//status // was message sent?
//tag

const txtMessageSchema = new Schema(
  {
    message: {
      type: String,
      required: true
    },
    wasMsgSent: {
      type: Boolean,
      default: false
    },
    whenToSendMsg: {
      type: Date,
      required: true
    },
    tag: {
      type: String,
      default: "untagged"
    }
  },
  {
    timestamps: true
  }
);

var txtMessages = mongoose.model("txtMessage", txtMessageSchema);

module.exports = txtMessages;
