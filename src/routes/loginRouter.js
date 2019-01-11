const express = require('express');
const loginRouter = express.Router();

function router(viewData) {
    loginRouter.route('/').get((req, res) => {
        res.render('login', viewData);
    });
    return loginRouter;
}


module.exports = router;