# Rolly

This is a quick and dirty proof of concept to access Google APIs using Cloud Functions.
The application will demonstrate how to build a small applicationc to take some input and then
pass this information on the a Google API. In the example file, we use the Speech, however
the approach is good to utilise any of the APIs available

# Sample Application

The sample application contains two Cloud Functions. 

### FRONTEND: rolly-fe

![Rolly Frontend image](https://github.com/rosera/rolly/blob/master/images/rolly-fe.png "Rolly Frontend")

The first function manages the front-end in 
which there is a form that contains information to be completed. Once the form is completed, select
the submit button to pass the information to the backend.

Packages:
* @google-cloud/functions-framework
* pug

### BACKEND: rolly-be

The second function represents a backend application awaiting information to be posted to the available
URL. The application expects some parameters that will be used to indicate how to process the
information sent.

Packages:
* @google-cloud/functions-framework
* @google-cloud/text-to-speech
* @google-cloud/storage


# Dependencies

The sample application runs on Google Cloud and requires access to Google APIs. The source code has 
been written as Nodejs modules and uses Cloud Functions with the Functions Framework.

# Fork Me

Feel free to re-use the code as you see fit. Licenced as GNU GPLv3.
