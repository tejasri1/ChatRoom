const express = require('express');
const homeRouter = express.Router();

homeRouter.route('/').get((req, res) => {
    const title = 'Chat Room';
    const msgs = ['Hey', 'Hello, Whats up?'];
    const viewData = {
    	title,
    	msgs
    }
    res.render('index', viewData); 
});

module.exports = homeRouter;