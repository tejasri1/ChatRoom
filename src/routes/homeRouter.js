const express = require('express');
const debug = require('debug')('app:homeRouter');
const homeRouter = express.Router();

homeRouter.route('/').get((req, res) => {
    const title = 'Chat Room';
    res.render('loginSignup', {title}); 
});

module.exports = homeRouter;