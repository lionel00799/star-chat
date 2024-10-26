const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    try {
        const friendname = req.body.friendname;
        console.log("friendname:", friendname);
        
        // Fetch friendEmail based on the username (friendname)
        const friendEmail = await User.findOne({ username: friendname }, 'email');
        
        // Check if friendEmail is found
        if (!friendEmail) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // If friendEmail exists, send the response
        res.json({
            name: friendname,
            email: friendEmail.email
        });
    } catch (error) {
        console.error("Error fetching friend data:", error); // Log the error for debugging
        res.status(500).json({ message: 'Internal server error!!' });
    }
});

module.exports = router;