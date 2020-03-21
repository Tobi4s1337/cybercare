const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = mongoose.Schema({
	_id: Number,
	victims: [ { type: Schema.Types.ObjectId, ref: 'Victim', autopopulate: true } ],
	volunteers: [ { type: Schema.Types.ObjectId, ref: 'Volunteer', autopopulate: true } ],
	needVolunteers: Boolean
});

placeSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Place', placeSchema);
