const mongoose = require('mongoose');

const victimSchema = mongoose.Schema({
	email: {
		type: String,
		unique: true
	},
	postalCode: Number,
	phoneNumber: String,
	problem: {
		text: String,
		audioFile: String,
		priority: Number
	}
});

module.exports = mongoose.model('Victim', victimSchema);
