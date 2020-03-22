const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
	res.render('landing', {
		page: 'landing'
	});
});

router.get('/kontakt', function(req, res) {
	res.render('contact', {
		page: 'contact'
	});
});

router.post('/postalforward', function(req, res) {
	console.log(req.body.postalCode);
	res.redirect('/' + req.body.postalCode);
});

module.exports = router;
