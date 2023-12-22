const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt= require('bcryptjs');
require('dotenv').config();
const jwt=require('jsonwebtoken');
const jwtSecret=process.env.SECRET;
const User=require('../Models/User')
const app = express();
app.use(express.json());

router.post('/createUser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }).withMessage('should contain at least 5 characters'),
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = await User.create({
            email: req.body.email,
            password: hashedPassword,
        });

        res.json({ success: true });
    } catch (err) {
        console.error(err);

        if (err.code === 11000) {
            // Duplicate key (e.g., duplicate email)
            return res.status(400).json({ success: false, error: 'Email already exists' });
        }

        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/loginUser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }).withMessage('should contain min 5 char'),
], async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    try {
        let email=req.body.email;
        let userData = await User.findOne({email});
        if (!userData) {
            return res.status(400).json({ errors: 'Email not found! Enter correct email' });
        }
        const pwdCompare= await bcrypt.compare(req.body.password, userData.password);
        if (!pwdCompare) {
            return res.status(400).json({ errors: 'Incorrect Password!' });
        }
        const data= {
            user:{
                id:userData.id
            }
        };
        const authToken=jwt.sign(data, jwtSecret);
        return res.json({ success: true , authToken: authToken});
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }

});

module.exports = router;

