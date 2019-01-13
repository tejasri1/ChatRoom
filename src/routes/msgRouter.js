const express = require('express');
const debug = require('debug')('app:msgRouter');
const msgRouter = express.Router();
const title = 'Chat Room';
const msgs = ['Hey', 'Hello, Whats up?'];
const viewData = {
	title,
	msgs
}

msgRouter.route('/new')
.post((req, res) => {    
    debug("reached POST POST");
    //update data base with messages
    debug(req.body);
    res.render('dashboard', viewData); 
})
msgRouter.route('/')
.get((req, res) => {
	debug("reached POST GET");
	res.render('dashboard', viewData);
});

module.exports = msgRouter;