const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
    active: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const ConversationModel = mongoose.model("Conversation", ConversationSchema);
module.exports = ConversationModel;
