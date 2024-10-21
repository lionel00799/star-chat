const Conversation = require('../models/Conversation');

const startConversation = async (senderId, receiverId) => {
    try {
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = new Conversation({
                participants: [senderId, receiverId]
            });

            await conversation.save();
        }

        console.log('Conversation started successfully!', conversation._id);
        return conversation._id;
    } catch (error) {
        console.error('Error starting conversation:', error);
    }
}

module.exports = startConversation