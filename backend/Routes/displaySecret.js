const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User=require('../Models/User')

router.post('/displaySecret', async (req, res) => {
    try {
        // Find all users
        const users = await User.find({}, 'secret');

        // Filter and flatten only existing and valid 'secret' arrays
        const allSecrets = users
            .filter(user => user.secret && Array.isArray(user.secret))
            .map(user => user.secret)
            .flat();

        res.status(200).json({ allSecrets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error occurred' });
    }
});

module.exports=router;
