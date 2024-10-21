// backend/models/Conversation.js
const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update `updatedAt` field whenever a message is added
conversationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;