const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const router = express.Router();

// Returns TwiML which prompts the caller to record a message
router.post('/record', (request, response) => {
	// Use the Twilio Node.js SDK to build an XML response
	const twiml = new VoiceResponse();
	twiml.say('Hello. Please leave a message after the beep. Unless!');

	// Use <Record> to record and transcribe the caller's message
	twiml.record({ transcribe: true, maxLength: 30 });

	// End the call with <Hangup>
	twiml.hangup();

	// Render the response as XML in reply to the webhook request
	response.type('text/xml');
	response.send(twiml.toString());
});

module.exports = router;
