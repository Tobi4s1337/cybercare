const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
	res.render('landing');
});

router.post('/faq', function(req, res) {
	res.render('faq');
});

router.post('/impressum', function(req, res) {
	res.render('impressum');
});

module.exports = router;
