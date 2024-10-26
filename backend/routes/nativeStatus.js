const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId;
        console.log("native userId:", userId);
        const friends = await User.findById(userId).populate('friends', 'username email');

        const friendList = friends.friends.map(friend => {
            return {
                name: friend.username,
                email: friend.email
            };
        });

        console.log("native friendList:", friendList);

        res.json({
            friends: friendList
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal status server error' });
    }
});

module.exports = router;