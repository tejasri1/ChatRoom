const express = require('express');
const MongoClient = require('mongodb').MongoClient;
// const { MongoClient } = require('mongodb');
const adminRouter = express.Router();
const debug = require('debug')('app:adminRouter');

const loginSignups = [{
    id: 1,
    username: 'teja',
    password: '1234',
    status: 'active'
}, {
    id: 2,
    username: 'veda',
    password: '1234',
    status: 'inactive'
}, {
    id: 3,
    username: 'sumeet',
    password: '1234',
    status: 'active'
}];

const msgs = [{},{},{}];

function router(viewData) {
    adminRouter.route('/')
        .get((req, res) => {
            const url = process.env.DB_HOST;
            const dbName = 'ChatRoom';
            (async function mongo(){
                let client;
                try {
                    client = await MongoClient.connect(url); //waits for connection
                    debug('Connected to server');
                    const db = client.db(dbName);
                    const col = await db.collection('LoginSignup');
                    const response = await col.insertMany(loginSignups);
                    res.json(response);
                } catch (err) {
                	debug(err.stack);
                }
                client.close();
            }());
        });
    return adminRouter;
}


module.exports = router;