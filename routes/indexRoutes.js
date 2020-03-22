const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
	res.render('landing', { page: 'landing' });
});

router.post('/impressum', function(req, res) {
	res.render('impressum');
});

module.exports = router;
