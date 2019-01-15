const express = require('express');
const debug = require('debug')('app:loginSignupRouter');
const loginSignupRouter = express.Router();
const MongoClient = require('mongodb').MongoClient;
const passport = require('passport');

const failureMsg = {
    header: 'Login Failed',
    message: 'Please enter your correct details!'
}

//write generic insert, delete functions taking 
// dbName and data as arguments
function router(viewData) {
    debug('Reached login');
    loginSignupRouter.route('/login')
    .get((req, res) => {
    	res.render('login', {title: "Chat Room"});
    })
    .post(passport.authenticate('local', {
      successRedirect: '/user/profile',
      failureRedirect: '/'
      //add failure flash
    }));

    loginSignupRouter.route('/signup').post((req, res) => {

        const url = process.env.DB_HOST;
        const dbName = 'ChatRoom';
        (async function addUser() {
            let client;
            try {
                client = await MongoClient.connect(url); //waits for connection
                debug('Connected to server');
                const db = client.db(dbName);
                const col = await db.collection('LoginSignup');
                const response = await col.insertOne({
                    username: req.body.username,
                    password: req.body.password
                });
                debug(response);
            } catch (err) {
                debug(err.stack);
            }
            client.close();
        }());

        req.login(req.body, () => {
            res.redirect('/user/profile');
        });
    });
    loginSignupRouter.route('/profile').get((req, res) => {
        res.redirect('/post/')
        // res.json(req.user);
    });
    return loginSignupRouter;
}


module.exports = router;