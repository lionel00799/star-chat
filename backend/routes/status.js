const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId;
        const friends = await User.findById(userId).populate('friends', 'username isOnline');

        const friendList = friends.friends.map(friend => {
            return {
                name: friend.username,
                status: friend.isOnline
            };
        });

        console.log("friendList:", friendList);

        res.json({
            friends: friendList
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal status server error' });
    }
});

module.exports = router;