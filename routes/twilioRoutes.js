const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const router = express.Router();

router.post('/record', (request, response) => {
	// Use the Twilio Node.js SDK to build an XML response
	const twiml = new VoiceResponse();
	console.log(request.body);
	if (request.body.Digits) {
		console.log(request.body.Digits);
		twiml.say(
			{
				voice: 'woman',
				language: 'de-DE'
			},
			'Bitte melden Sie Ihr Problem und sagen sie wie dringend sie hilfe benötigen'
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
		gatherUrgency.say(
			{
				voice: 'woman',
				language: 'de-DE'
			},
			'Geben tippen sie bitte ihre postleitzahl ein.'
		);
	}

	// Render the response as XML in reply to the webhook request
	response.type('text/xml');
	response.send(twiml.toString());
});

module.exports = router;
