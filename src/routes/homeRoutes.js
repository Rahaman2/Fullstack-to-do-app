const express = require('express');
const router = express.Router();


// import the home controller

const homeController = require('../controllers/homeController');
const User = require('../models/User');

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}




// Define routed for home-related routes

// route for home page

router.get('/', homeController.homePage);
router.get('/todo', ensureAuthenticated , homeController.todoPage);
module.exports = router ;
