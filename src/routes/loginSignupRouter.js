const express = require('express');
const debug = require('debug')('app:loginSignupRouter');
const loginSignupRouter = express.Router();
const MongoClient = require('mongodb').MongoClient;
const failureMsg = {header: 'Login Failed',
					message: 'Please enter your correct details!'}

//write generic insert, delete functions taking 
// dbName and data as arguments
function router(viewData) {
    loginSignupRouter.route('/').get((req, res) => {
    	debug('Reached here');
        res.render('loginSignup', viewData);
    });

    loginSignupRouter.route('/login').post((req, res) => {
    	debug('Reached login');
    	const url = process.env.DB_HOST;
        const dbName = 'ChatRoom';
        (async function mongo(){
            let client;
            try {
                client = await MongoClient.connect(url); //waits for connection
                debug('Connected to server');
                const db = client.db(dbName);
                const col = await db.collection('LoginSignup');
                const response = await col.findOne({username: req.body.user_name});
                
                if (response.password == req.body.password) {
                	res.redirect('/post');
                } else {
                	debug("failed");
                	res.json(failureMsg);
                }
            } catch (err) {
            	debug(err.stack);
            }
            client.close();
            }());
    });
    return loginSignupRouter;
}


module.exports = router;