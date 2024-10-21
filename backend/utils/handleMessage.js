const Message = require("../models/Message");
const User = require("../models/User");
const Conversation = require("../models/Conversation");

const saveMessage = async (conversationId, senderId, receiverId, message) => {
  try {
    const newMessage = new Message({
      conversationId: conversationId,
      sender: senderId,
      receiver: receiverId,
      message: message,
      timestamp: new Date()
    });

    await newMessage.save();
    console.log("Message saved successfully!");
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

const getConversationMessages = async conversationId => {
  try {
    const messages = await Message.find({ conversationId })
      .populate("sender", "username")
      .populate("receiver", "username")
      .sort({ timestamp: 1 });

    return messages;
  } catch (err) {
    console.error(err);
  }
};

const getConversationInfo = async (senderId, friendname) => {
  try {
    console.log("senderId:", senderId, "friendname:", friendname);
    const friend = await User.findOne({ username: friendname }, "_id");
    const friendId = friend._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, friendId] }
    }, "_id");
    const conversationId = conversation._id;
    
    return { conversationId, friendId };
  } catch (error) {
    console.error("Error getting conversation info:", error);
  }
}

module.exports = { saveMessage, getConversationMessages, getConversationInfo };
