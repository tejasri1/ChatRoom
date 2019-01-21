const express = require('express');
const debug = require('debug')('app:msgRouter');
const MongoClient = require('mongodb').MongoClient;
const msgRouter = express.Router();

const url = process.env.DB_HOST;
const dbName = 'ChatRoom';
const title = 'Chat Room';

msgRouter.use((req, res, next) => {
    if (req.user) {
        next();
    } else {
        debug('user not found')
        res.redirect('/');
    }
});
msgRouter.route('/new')
    .post((req, res) => {

        //update data base with messages
        const username = req.user.username || req.username;
        var time = new Date();
        var year = time.getFullYear();
        var month = time.getMonth()+1;
        var date = time.getDate();
        var hour = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
        const timestamp = req.timestamp || month+"."+date+"."+year + " | " + hour+":"+minutes;
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url); //waits for connection
                const db = client.db(dbName);
                const col = await db.collection('Messages');
                const response = await col.insertOne({
                    timestamp,
                    msg: req.body.msg,
                    username
                });
                res.redirect('/post');
            } catch (err) {
                debug(err.stack);
            }
            client.close();
        }());
    })
msgRouter.route('/')
    .get((req, res) => {
        debug(req.user);
        const username = req.user.username;
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url); //waits for connection
                const db = client.db(dbName);
                const col = await db.collection('Messages');
                const msgs = await col.find({})
                    .project({ msg: 1, _id: 0, username: 1, timestamp: 1 })
                    .sort({ timestamp: 1 })
                    .toArray();
                res.render('dashboard', {
                    title: title,
                    msgs,
                    username
                });
            } catch (err) {
                debug(err.stack);
            }
            client.close();
        }());

    });

module.exports = msgRouter;