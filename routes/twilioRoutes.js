const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const path = require('path');
const router = express.Router();

router.post('/priority', (request, response) =>{
	// Use the Twilio Node.js SDK to build an XML response
	const twiml = new VoiceResponse();

	//Ask for urgency of response 
	//Use the <gather> verb to collect user input
	
	const gather_urgency = twiml.gather({ numDigits: 1});
	gather_urgency.say(
		{
			voice: 'woman',
			language: 'de-DE'
		},
		'Wie dringend ist ihr problem auf einer skala von 1 bis 5?'
	);

	// If the user entered digits, process their request
	if (request.body.Digits) {
		console.log(request.body.Digits)
		
		twiml.redirect('/voice/postal');
		
	} else {
		// If no input was sent, use the <Gather> verb to collect user input
		gather();
	}		


}) 

router.post('/postal', (request, response) => {
	// Use the Twilio Node.js SDK to build an XML response
	const twiml = new VoiceResponse();

	const gather_postcode = twiml.gather({ numDigits: 5});
	gather_postcode.say(
		{
			voice: 'woman',
			language: 'de-DE'
		},
		'Bitte geben sie ihre Postleitzahl ein.'
	);

	// If the user entered digits, process their request
	if (request.body.Digits) {
		console.log(request.body.Digits)

		twiml.redirect('/voice/record');

	} else {
		// If no input was sent, use the <Gather> verb to collect user input
		gather();
	}		

})

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
