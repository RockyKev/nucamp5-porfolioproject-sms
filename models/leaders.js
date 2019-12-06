const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeadersSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    designation: {
      type: String,
      default: '' 
    },
    abbr: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

var Leaders = mongoose.model("Leader", LeadersSchema);

module.exports = Leaders;
