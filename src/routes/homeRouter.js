const express = require('express');
const debug = require('debug')('app:homeRouter');
const homeRouter = express.Router();

homeRouter.route('/').get((req, res) => {
    const title = 'Chat Room';
    const msgs = ['Hey', 'Hello, Whats up?'];
    const viewData = {
    	title,
    	msgs
    }
    debug("reached home page");
    res.render('index', viewData); 
});

module.exports = homeRouter;