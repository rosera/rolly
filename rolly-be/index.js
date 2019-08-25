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
async function googleSpeechEngine(message) {
  const client = new textToSpeech.TextToSpeechClient();
  const text = 'Blurb';

  // Construct the REST API call
  const request = {
    input: {text: message},
    voice: {languageCode: 'en-UK', ssmlGender: 'NEUTRAL'},
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
  let name = req.query.name || 'error';
  let type = req.query.type || 'error';
  let message = req.query.message || 'error';

  // Debug messages
  console.log('Name: ' + name);
  console.log('Type: ' + type);
  console.log('Message: ' + message);

  // Call the text-to-speech engine
  //googleSpeechEngine("This is a test message from rollFrontEnd");
}
