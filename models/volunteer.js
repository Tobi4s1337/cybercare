const mongoose = require('mongoose');

const volunteerSchema = mongoose.Schema({
	email: {
		type: String,
		unique: true
	},
	postalCode: Number
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
