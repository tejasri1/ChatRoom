const express = require('express');
const debug = require('debug')('app:loginSignupRouter');
const loginSignupRouter = express.Router();
const MongoClient = require('mongodb').MongoClient;
const passport = require('passport');

const failureMsg = {
    header: 'Login Failed',
    message: 'Please enter your correct details!'
}


function router(viewData) {
    loginSignupRouter.route('/login')
    .get((req, res) => {
    	res.render('login', {title: "Chat Room"});
    })
    .post(passport.authenticate('local', {
      successRedirect: '/post/',
      failureRedirect: '/'
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
            } catch (err) {
                debug(err.stack);
            }
            client.close();
        }());

        req.login(req.body, () => {
            res.redirect('/post/');
        });
    });
    
    loginSignupRouter.route('/logout').get((req,res) => {
        // req.logout(function(){
            const title = 'Chat Room';
            res.render('signup', {title}); 
        // });
    });
    return loginSignupRouter;
}


module.exports = router;