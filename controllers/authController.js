const router = require('express').Router();
const bcrypt  =require('bcryptjs');
const jwt  = require('jsonwebtoken');
const User =require('./../models/user');

router.post('/signup', async (req, res) => {
    try {
        // Validate required fields
        const { firstname, lastname, email, password } = req.body;
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).send({
                message: 'All fields are required.',
                success: false,
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                message: 'User already exists.',
                success: false,
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        res.status(201).send({
            message: 'User created successfully!',
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: 'An error occurred during signup.',
            success: false,
            error: error.message,
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).send({
                message: 'Email and password are required.',
                success: false,
            });
        }

        // Check if user exists
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).send({
                message: 'User does not exist.',
                success: false,
            });
        }

        // Check if the password is correct
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(400).send({
                message: 'Invalid password.',
                success: false,
            });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

        res.status(200).send({
            message: 'User logged in successfully!',
            success: true,
            token,
        });
    } catch (error) {
        res.status(500).send({
            message: 'An error occurred during login.',
            success: false,
            error: error.message,
        });
    }
});
module.exports  = router;