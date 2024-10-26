const express = require('express');
const router = express.Router();
const User = require('../models/User');
const addFriend = require('../utils/handleFriendList');
const startConversation = require('../utils/handleConversation');

router.get('/', async (req, res) => {
    try {
        const friendname = req.query.friendname;
        const userId = req.query.userId;
        const username = await User.findById(userId, 'username');
        const friendId = await User.findOne({username: friendname}, '_id');

        console.log("friendname:", friendname, "username:", username);

        const user = await User.findOne({username: friendname});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await addFriend(userId, friendId._id.toString());
        await startConversation(userId, friendId._id.toString());

        res.json({
            success: 'Add friend successfully!'
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error!' });
    }
});

module.exports = router;