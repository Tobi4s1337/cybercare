const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const router = express.Router();

router.post('/priority', (request, response) => {
	console.log('POST REQUEST PRIORITY');
	// Use the Twilio Node.js SDK to build an XML response
	const twiml = new VoiceResponse();

	const gatherUrgency = twiml.gather({ numDigits: 1 });
	gatherUrgency.say(
		{
			voice: 'woman',
			language: 'de-DE'
		},
		'Wie dringend ist ihr problem auf einer skala von 1 bis 5?'
	);
	// If the user doesn't enter input, loop
	twiml.redirect('/voice/priority');

	// If the user entered digits, process their request
	if (request.body.Digits) {
		console.log(request.body.Digits);
		if (request.body.Digits.length === 5) {
			twiml.redirect('/voice/record');
		} else {
			twiml.redirect('/voice/postal');
		}
	}
});

router.post('/postal', (request, response) => {
	// Use the Twilio Node.js SDK to build an XML response
	const twiml = new VoiceResponse();

	const gatherPostcode = twiml.gather({ numDigits: 5 });
	gatherPostcode.say(
		{
			voice: 'woman',
			language: 'de-DE'
		},
		'Bitte geben sie ihre Postleitzahl ein.'
	);
	// If the user doesn't enter input, loop
	twiml.redirect('/voice/postal');

	// If the user entered digits, process their request
	if (request.body.Digits) {
		console.log(request.body.Digits);
		twiml.redirect('/voice/record');
	}
});

router.post('/record', (request, response) => {
	// Use the Twilio Node.js SDK to build an XML response
	const twiml = new VoiceResponse();

	twiml.say(
		{
			voice: 'woman',
			language: 'de-DE'
		},
		'Bitte melden Sie Ihr Problem. Unless!'
	);

	// Use <Record> to record and transcribe the caller's message
	twiml.record({ transcribe: true, maxLength: 30 });

	// End the call with <Hangup>
	twiml.hangup();

	// Render the response as XML in reply to the webhook request
	response.type('text/xml');
	response.send(twiml.toString());
});

module.exports = router;
