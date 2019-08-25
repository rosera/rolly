# Rolly

An example project for the Google API TextToSpeech Library

# Overview
The application uses a front-end node application to gather the settings and text to be transposed.
Ouput will be sent to the designated bucket and a file named audio.mp3 will be created.


# Form Submit

http://localhost:8080/action.html?speech_text=This+is+a+message&voice_name=en-US-Wavenet-A&voice_type=WaveNet

speech_text - Text to be transposed
voice_name - Name of the voice to be used
voice_type - Type of algorithm to be used


# Details

Two projects 

rolly-fe - Rolly Front-End (Data entry form)
rolly-be - Rolly Back-End (Talks to the Google API)
