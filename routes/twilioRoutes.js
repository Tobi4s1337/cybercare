require('dotenv').config();
const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const router = express.Router();
const Victim = require('../models/victim');
const Place = require('../models/place');
const accountSid = 'AC1b3ea53ce52ee15a50d7672dc6b85416';
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


router.post('/record', (req, res) => {
	// Use the Twilio Node.js SDK to build an XML response
	const twiml = new VoiceResponse();
	if (req.body.Digits) {
		console.log(req.body.Digits);
		twiml.say({
				voice: 'Polly.Vicki',
				language: 'de-DE'
			},
			'Bitte schildern sie Ihr Problem und sagen sie wie dringend sie hilfe benötigen'
		);

		// Use <Record> to record and transcribe the caller's message
		twiml.record({
			transcribe: true,
			maxLength: 30
		});

		// End the call with <Hangup>
		twiml.hangup();
	} else {
		// Use the <Gather> verb to collect user input
		const gatherUrgency = twiml.gather({
			numDigits: 5
		});
		gatherUrgency.say({
				voice: 'Polly.Vicki',
				language: 'de-DE'
			},
			'Geben sie bitte ihre postleitzahl ein.'
		);
	}

	console.log(req.body);

	if (req.body.Digits && req.body.Digits.length === 5) {
		Victim.create({
				_id: req.body.CallSid,
				postalCode: req.body.Digits,
				phoneNumber: req.body.phoneNumber
			},
			(err) => {
				if (err) console.log(err);
				console.log('created new victim');
			}
		);
	} else if (req.body.RecordingUrl) {

		client.transcriptions('TRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
			.fetch()
			.then(transcription => {
				Victim.findByIdAndUpdate(
					req.body.CallSid, {
						problem: {
							audioFile: req.body.RecordingUrl
						}
					},
					(err, victim) => {
						if (err) console.log(err);
						console.log('victim updated');
						console.log(victim);
						Place.findById(victim.postalCode, (err, place) => {
							if (err) console.log(err);
							if (place) {
								let victims = place.victims;
								victims.push(victim._id);
								Place.findByIdAndUpdate(
									victim.postalCode, {
										victims: victims
									},
									(err, place) => {
										console.log('added victim to place');
										console.log(place);
									}
								);
							} else {
								Place.create({
										_id: victim.postalCode,
										victims: [victim._id]
									},
									(err, place) => {
										if (err) console.log(err);
										console.log('Created place');
										console.log(place);
									}
								);
							}
						});
					}
				);
			});


	}

	// Render the response as XML in reply to the webhook request
	res.type('text/xml');
	res.send(twiml.toString());
});

module.exports = router;