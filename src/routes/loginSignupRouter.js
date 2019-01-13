const express = require('express');
const debug = require('debug')('app:loginSignupRouter');
const loginSignupRouter = express.Router();
const MongoClient = require('mongodb').MongoClient;
const failureMsg = {header: 'Login Failed',
					message: 'Please enter your correct details!'}

function router(viewData) {
    loginSignupRouter.route('/').get((req, res) => {
    	debug('Reached here');
        res.render('loginSignup', viewData);
    });

    loginSignupRouter.route('/login').post((req, res) => {
    	debug('Reached login');
    	const url = 'mongodb://localhost:27017';
        const dbName = 'ChatRoom';
        (async function mongo(){
            let client;
            try {
                client = await MongoClient.connect(url); //waits for connection
                debug('Connected to server');
                const db = client.db(dbName);
                const col = await db.collection('LoginSignup');
                const response = await col.findOne({username: req.body.user_name});
                // const response = await col.find().toArray();
                if (response.password == req.body.password) {
                	res.redirect(/home/);
                } else {
                	debug("failed");
                	res.json(failureMsg);
                }
            } catch (err) {
            	debug(err.stack);
            }
            client.close();
            }());
        // res.send('Reached user/login');
         // res.render('loginSignup', viewData);
    });
    return loginSignupRouter;
}


module.exports = router;