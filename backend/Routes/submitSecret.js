const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../Models/User');

const app = express();
app.use(express.json());

router.post('/submitSecret', [
    body('email').isEmail(),
    body('secret').isLength({ min: 10 }).withMessage('Warning: Secret should contain at least 10 characters'),
], async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    try {
        const email = req.body.email;
        const newSecret = req.body.secret;
    
        // Find the user by email
        let userData = await User.findOne({ email });
    
        if (userData) {
            // Check if 'secret' array exists
            if (!userData.secret || !Array.isArray(userData.secret)) {
                // If 'secret' array doesn't exist or is not an array, initialize it
                userData.secret = [newSecret];
            } else {
                // 'secret' array exists, push the new secret
                userData.secret.push(newSecret);
            }
    
            // Save the updated user data
            await userData.save();
    
            return res.status(200).json({ success: true, message: 'Secret added successfully' });
        } else {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (err) {
        // console.error(err);
        res.status(500).json({ success: false, message: 'Error occurred' });
    }    
});

module.exports = router;
