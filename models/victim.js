const mongoose = require('mongoose');

const victimSchema = mongoose.Schema(
	{
		_id: {
			type: String,
			unique: true
		},
		email: {
			type: String
		},
		postalCode: Number,
		phoneNumber: String,
		mobilePhoneNumer: String,
		problem: {
			text: String,
			audioFile: String,
			priority: Number
		}
	},
	{ _id: false }
);

module.exports = mongoose.model('Victim', victimSchema);
