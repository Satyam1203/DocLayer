let mongoose = require("mongoose");

let documentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

let Document = mongoose.model("Document", documentSchema);

module.exports = Document;
