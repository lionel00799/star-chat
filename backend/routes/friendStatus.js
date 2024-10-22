const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const friendname = req.query.friendname;
        const friend = await User.findOne({username: friendname}, 'isOnline');

        res.json({
            friendStatus: friend.isOnline
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal friend status server error' });
    }
});

module.exports = router;