const express = require('express');
const User = require('../Models/UserSchema');
const router = express.Router();
const bcrypt = require('bcrypt');
const validator = require("email-validator");
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send('Hey from Users route!')
});

// Create New User 
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // check if email is valid or not using validator npm package
        if (!validator.validate(email)) {
            return res.status(400).send({ message: 'Please Enter Valid Email!' });
        }

        // check if user exists or not using username/email
        const userExists = await User.findOne({ $or: [{ username }, { email }] });
        if (userExists) {
            return res.status(200).send({ message: 'User already exists!' });
        }

        // hash password using bcrypt 
        const hashedPassword = await bcrypt.hash(password, 12);

        // save new user if all above checks are successful
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(200).send({ user, message: 'User created successfully!' });

    } catch (error) {
        res.status(400).send({ error: 'Internal Server Error' });
    }
});

// Login User 
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // find user in db
        const user = await User.findOne({ username });

        // if user not found 
        if (!user) {
            // User not found
            return res.status(400).send({ message: 'Invalid login credentials' });
        }

        // if found, compare password using bcrypt compare method 
        if (await bcrypt.compare(password, user.password)) {

            const token = jwt.sign({
                _id: user._id.toString()
            }, process.env.JWT_SECRET_KEY);

            return res.status(200).send({ user, message: 'User logged in successfully!', token });
        } else {
            // Incorrect password
            return res.status(400).send({ message: 'Invalid login credentials' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
});

module.exports = router;