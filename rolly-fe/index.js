// Author: Rich Rose
// Name: Rolly
// Description: A simple front end for the Text to Speech API

// Support data for the frontend
var data = require('./data/options');
var pug  = require('pug');

/**
 * responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
*/
exports.rollyFrontEnd = (req, res) => {
  const pugInputFile = pug.compileFile('views/index.pug');

  // Pass name and type to the
  res.status(200).send(pugInputFile({
     voice_names: data['name'],
     voice_langs: data['language']
  }));
};

