const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const username = req.query.username;
        console.log("username:", username);
        const user = await User.findOne({username: username});
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            success: 'Add friend successfully!'
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;