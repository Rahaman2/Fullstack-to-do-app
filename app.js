require('dotenv').config()
const express = require('express');
const app = express();
const ejs = require('ejs');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local');
// mock user database
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
  ];
// middleware configuration
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(authUser)); // authUser will be createsd later

const authUser = (user , password, done) => {
    // search the user password in the db to authenticate user eg.
    // let authenticatedUser = { id:1, username: "user1", password: "password1"};
    let authenticatedUser = users.find(u => u.username === user && u.password === passport);
    return authenticatedUser != null || undefined? done(null, authenticatedUser): done(null, false);
    // 1. If the user not found in DB, 
    // done (null, false)
    // 2. If the user found in DB, but password does not match, 
    // done (null, false)
    // 3. If user found in DB and password match, 
    // done (null, {authenticated_user})
};

passport.serializeUser((userObj, done) => {
    done(null, userObj)
});

passport.deserializeUser((userObj, done) => {
    done(null, userObj)
})








// Routes

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
})

app.get('/todo', (req, res) => {
    res.render('todo');
});








const PORT = 10000
app.listen(PORT, () => console.log(`Application listerning on port ${PORT}`));