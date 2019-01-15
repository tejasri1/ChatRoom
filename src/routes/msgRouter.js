const express = require('express');
const debug = require('debug')('app:msgRouter');
const MongoClient = require('mongodb').MongoClient;
const msgRouter = express.Router();

const url = process.env.DB_HOST;
const dbName = 'ChatRoom';
const title = 'Chat Room';

msgRouter.route('/new')
    .post((req, res) => {
        debug("reached POST POST");
        //update data base with messages
        debug(req.user);
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url); //waits for connection
                const db = client.db(dbName);
                const col = await db.collection('Messages');
                const response = await col.insertOne({
                    timestamp: Date(),
                    msg: req.body.msg,
                    username: req.user.username
                });
                res.redirect('/post');
                // res.json(response);
            } catch (err) {
                debug(err.stack);
            }
            client.close();
        }());
    })
msgRouter.route('/')
    .get((req, res) => {
        debug("reached POST GET");
        debug(req.user);
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url); //waits for connection
                const db = client.db(dbName);
                const col = await db.collection('Messages');
                const msgs = await col.find({})
                    .project({ msg: 1, _id: 0, username: 1 })
                    .sort({ timestamp: 1 })
                    .toArray();
                
                res.render('dashboard', {
                    title: title,
                    msgs
                });
            } catch (err) {
                debug(err.stack);
            }
            client.close();
        }());

    });

module.exports = msgRouter;