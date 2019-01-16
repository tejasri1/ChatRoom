const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const debug = require('debug');
const MongoClient = require('mongodb').MongoClient;


//strategy pulls username and password out of body
	passport.use(new Strategy({
		usernameField: 'username',
		passwordField: 'password'
	}, (username, password, done) => {
		const user = {
			username, password
		};
		const url = process.env.DB_HOST;
        const dbName = 'ChatRoom';
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url); //waits for connection
                debug('Connected to server');
                const db = client.db(dbName);
                const col = await db.collection('LoginSignup');
                const response = await col.findOne({ username: username });
                if (response == null || response.password != password) {
                    done(null, false);
                } else{
                    done(null, user);
                }
                
                
            } catch (err) {
                done(err);
                debug(err.stack);
            }
            client.close();
        }());
		
	}));

//change it
module.exports = function passportConfig(app) {
	app.use(passport.initialize());
	app.use(passport.session());

	//write function instead of lamda
	//store in session
	passport.serializeUser((user, done) => {
		done(null, user);
	});

	//retrieve from session
	passport.deserializeUser((user, done) => {
		done(null, user);
	});

	

}