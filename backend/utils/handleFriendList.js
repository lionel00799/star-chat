const User = require('../models/User');

const addFriend = async (userId, friendId) => {
    try {
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user.friends.includes(friendId)) {
            user.friends.push(friendId);
        }
        if (!friend.friends.includes(userId)) {
            friend.friends.push(userId);
        }

        await user.save();
        await friend.save();

        console.log('Friend added successfully!');
    } catch (error) {
        console.error('Error adding friend:', error);
    }
}

module.exports = addFriend