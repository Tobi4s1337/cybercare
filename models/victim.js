const mongoose = require('mongoose');

const victimSchema = mongoose.Schema(
	{
		_id: String,
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
	{ _id: false, timestamps: true }
);

module.exports = mongoose.model('Victim', victimSchema);
