const express = require('express');
const router = express.Router();

// redirects to dashboard/todo if the user is authenticated
const redirectToDashboard = (req, res, next) => {
    if(req.isAutenticated()) {
        return res.redirect("/todo");
    }
    return next();
}


// Import the user controller
const userController = require('../controllers/userController');

// Define routes for user-related operations

// Route for user registration form
router.get('/register', redirectToDashboard,userController.getRegisterForm);

// Route for processing user registration
router.post('/register', userController.registerUser);

// Route for user login form
router.get('/login', redirectToDashboard ,userController.getLoginForm);

// Route for processing user login
router.post('/login', userController.loginUser);

// Route for user logout
router.get('/logout', userController.logoutUser);

// Export the router
module.exports = router;
