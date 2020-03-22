const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = mongoose.Schema(
	{
		_id: Number,
		victims: [ { type: String, ref: 'Victim', autopopulate: true } ],
		volunteers: [ { type: String, ref: 'Volunteer', autopopulate: true } ],
		needVolunteers: Boolean
	},
	{ _id: false }
);

placeSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Place', placeSchema);
