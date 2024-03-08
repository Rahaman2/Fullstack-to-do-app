// Import the necessary modules or models
const User = require('../models/User');
const passport = require('passport');
const flash = require('connect-flash')
// Controller function for rendering the user registration form
exports.getRegisterForm = (req, res) => {
    res.render('register', {message: req.flash('error')}); // Render the register form view
};

// Controller function for processing user registration
exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        // Create a new user
        const newUser = new User({ username });
        await newUser.setPassword(password); // Set the password securely
        await newUser.save(); // Save the user to the database
        res.redirect('/todo'); // Redirect to the login page after successful registration
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function for rendering the user login form
exports.getLoginForm = (req, res) => {
    res.render('login', {message: req.flash('error')}); // Render the login form view
};

// Controller function for processing user login
exports.loginUser = passport.authenticate('local', {
    successRedirect: '/todo', // Redirect to the todo page after successful login
    failureRedirect: '/login', // Redirect back to the login page if authentication fails
    failureFlash: true
});

// Controller function for user logout
exports.logoutUser = (req, res) => {
    req.logout(); // Logout the user
    res.redirect('/login'); // Redirect to the login page after logout
};
