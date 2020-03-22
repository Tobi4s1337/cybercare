const express = require('express');
const router = express.Router({
	mergeParams: true
});
const Volunteer = require('../models/volunteer');
const Place = require('../models/place');

router.get('/', (req, res) => {
	Place.findById(req.params.id, (err, place) => {
		if (err) console.log(err);
		if (place) {
			res.render('places', {
				page: 'places',
				place: place
			});
		} else {
			res.render('places', {
				page: 'places'
			});
		}
	});
});

router.get('/', (req, res) => {
	res.render('kontakt', {
		page: 'kontakt'
	});
});

router.post('/', function (req, res) {
	Volunteer.create({
		email: req.body.email,
		postalCode: req.params.id
	}, (err, volunteer) => {
		if (err) console.log(err);
		Place.findById(req.param.id, (err, place) => {
			if (err) console.log(err);
			if (place) {
				let volunteers = place.volunteers;
				volunteer.push(volunteer._id);
				Place.findByIdAndUpdate(req.params.id, {
					volunteers: volunteers
				}, (err, place) => {
					if (err) console.log(err);
					console.log('Place updated');
				});
			} else {
				Place.create({
					_id: req.params.id,
					volunteers: [volunteer._id]
				}, (err, place) => {
					if (err) console.log(err);
					console.log('New place created');
				});
			}
		});
	});
});

module.exports = router;