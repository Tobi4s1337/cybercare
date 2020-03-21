require('dotenv').config();
const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	flash = require('connect-flash'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	victim = require('./models/victim'),
	volunteer = require('./models/volunteer'),
	place = require('./models/place');

//REQUIRING ROUTES
const indexRoutes = require('./routes/indexRoutes');
const placeRoutes = require('./routes/placeRoutes');

const url = process.env.DATABASEURL || 'mongodb://localhost/cybercare';
mongoose.set('useCreateIndex', true);
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
app.use(
	session({
		secret: process.env.secret || 'awesomesecret',
		cookie: { maxAge: 60000 },
		resave: true,
		saveUninitialized: true
	})
);

app.use('/', indexRoutes);
app.use('/:id', placeRoutes);

app.listen(process.env.PORT || 3000, function() {
	console.log('Cybercare server has started!');
});
