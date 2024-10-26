const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const userId = req.query.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            name: user.username,
            email: user.email
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error!!!' });
    }
});

module.exports = router;