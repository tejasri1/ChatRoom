const express = require('express'); //importing express
const chalk = require('chalk'); //colring debug statements
const debug = require('debug')('app');
const morgan = require('morgan'); //to save debug logs to files
const path = require('path');

const app = express(); //creating an instance of application (express framework)
const port = process.env.PORT || 3000;

app.use(morgan('tiny')); //combined
app.use(express.static(path.join(__dirname, '/public/'))); //location of static files 
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css'))); //static files from node_modules
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views'); //setting folder path for template engine to search
app.set('view engine', 'ejs'); //setting view engine

const viewData = {
    title: 'Chat Room'
}

const loginRouter = require('./src/routes/loginRouter')(viewData);
app.use('/login', loginRouter); //letting app know to use router

const homeRouter = require('./src/routes/homeRouter');
app.use('/home', homeRouter);

app.listen(port, function(){
	debug(`Express is   listening to port ${chalk.green(port)}`);
})