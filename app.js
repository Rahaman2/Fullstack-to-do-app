require('dotenv').config()
const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require("connect-flash");
const mongoose = require('mongoose');
const database = require("./database/database");
// mock user database
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
  ];


  
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session());

app.use(flash())

passport.use( new LocalStrategy((username, password, done) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return done(null, false, {message: "Incorrect Username or password"});
    }
    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});

const ensureAthenticated= (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login");
}

const redirectAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()){
        return res.redirect("/todo");
    }
    next()
}

const handle404Error = (req, res, next) => {
    res.status(404).render("404");
}


// Routes

app.get("/", redirectAuthenticatedUser ,(req, res) => {
    res.render("home");
});


app.get("/login" , redirectAuthenticatedUser, (req, res) => {
    res.render("login", {message: req.flash("error")});
});

app.get("/register", redirectAuthenticatedUser, (req, res) => {
    res.render("register");
})

app.get('/todo', ensureAthenticated ,(req, res) => {
    res.render('todo');
});
// handling non existing routes (404)
app.get("*", handle404Error)


// POST requests
app.post("/login", passport.authenticate('local', {
    successRedirect: "/todo",
    failureRedirect: '/login',
    failureFlash: true
}));


app.post("/register", (req, res) => {
    const {username, password } = req.body;

    if(users.some(u => u.username == username)) {
        res.status.send(`Username ${username} already exists`);
    } else {
        const newUser = {
            id: users.length + 1,
            username,
            password
        };
        users.push(newUser)
        res.redirect("login")
    }
})


const PORT = 10000
app.listen(PORT, () => console.log(`Application listerning on port ${PORT}`));