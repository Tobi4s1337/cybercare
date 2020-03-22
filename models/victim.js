const mongoose = require('mongoose');

const victimSchema = mongoose.Schema({
	_id: String,
	email: {
		type: String,
		unique: true
	},
	postalCode: Number,
	phoneNumber: String,
	mobilePhoneNumer: String,
	problem: {
		text: String,
		audioFile: String,
		priority: Number
	}
});

module.exports = mongoose.model('Victim', victimSchema);
