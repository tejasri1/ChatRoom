const express = require('express');
const debug = require('debug')('app:msgRouter');
const MongoClient = require('mongodb').MongoClient;
const msgRouter = express.Router();

const title = 'Chat Room';
// const msgs = ['Hey', 'Hello, Whats up?'];
// const viewData = {
// 	title,
// 	msgs
// }
const url = process.env.DB_HOST;
const dbName = 'ChatRoom';

msgRouter.route('/new')
.post((req, res) => {    
    debug("reached POST POST");
    //update data base with messages
    
    (async function mongo(){
        let client;
        try {
            client = await MongoClient.connect(url); //waits for connection
            const db = client.db(dbName);
            const col = await db.collection('Messages');
            const response = await col.insertOne({
            	timestamp: Date(),
            	msg: req.body.msg
            });
            res.redirect('/post');
            // res.json(response);
        } catch (err) {
        	debug(err.stack);
        }
        client.close();
    }());

    // res.render('dashboard', viewData); 
})
msgRouter.route('/')
.get((req, res) => {
	debug("reached POST GET");
	
	(async function mongo(){
        let client;
        try {
            client = await MongoClient.connect(url); //waits for connection
            const db = client.db(dbName);
            const col = await db.collection('Messages');
            const response = await col.find({})
            							.project({msg: 1, _id: 0})
            							.sort({timestamp: 1})
            							.toArray();
            var msgs = [];
            response.forEach(function(m){
            	msgs.push(m.msg);
            });
            res.render('dashboard', {
				title,
				msgs
			});
            // res.json(response);
        } catch (err) {
        	debug(err.stack);
        }
        client.close();
    }());
	
});

module.exports = msgRouter;