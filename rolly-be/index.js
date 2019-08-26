// Import Google Cloud client libraries
const textToSpeech = require('@google-cloud/text-to-speech');

const fs = require('fs');
const util = require('util');
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

// Define a location and filename for file to be generated
const myBucket = storage.bucket('roselabs-cloud-functions');
const file = myBucket.file('audio.mp3');

// Process the file
async function googleSpeechEngine(voice_name, lang, message) {
  const client = new textToSpeech.TextToSpeechClient();

  // Construct the REST API call - https://cloud.google.com/text-to-speech
  const request = {
    input: {text: message},
    voice: {languageCode: lang, ssmlGender: 'NEUTRAL', name: voice_name},
    audioConfig: {audioEncoding: 'MP3'},
  };

  // Wait for completion of the job
  const [response] = await client.synchronizeSpeech(request);

  // Write a temporary file
  const writeTempFile = util.promisfy(fs.writeFile);
  await writeTempFile('/tmp/output.mp3', response.audioContent, 'binary');

  // Write the temporary file to Cloud Storage
  fs.createReadStream('/tmp/output.mp3')
	.pipe(file.createWriteStream())
	.on('error', function(err) {})
	.on('finish', function() {
	  // Audio file has been written to Cloud Storage
  });

  // Generate a message to indicate the file is available
}

exports.rollyBackEnd=(req, res)=>{
  // Take the parameters from the Frontend
  let voice_name = req.query.voice_name || 'error';
  let lang = req.query.voice_lang || 'error';
  let message = req.query.speech_text || 'error';

  // Debug messages - show the parameters passed
  console.log('Name: ' + voice_name);
  console.log('Language: ' + lang);
  console.log('Message: ' + message);

  // Do some validation - just swap for correct values if empty
  

  // Call the text-to-speech engine
  //googleSpeechEngine(voice_name, lang, message);

  // Respond with an Ok
  res.status(200);
}
