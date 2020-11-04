import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const Dictaphone = ({ currentField }) => {
  const { transcript, resetTranscript } = useSpeechRecognition()
  const [listen, setListen] = useState([]);
  const [shouldITellThemIAmListening, setShouldITellThemIAmListening] = useState(false)

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (<div><p>Voice Recognition not supported by this browser</p></div>)
  }
  SpeechRecognition.startListening({ continuous: true })
  useEffect(() => {
    const newKeyWords = transcript.split(" ").slice(-2)
    setListen(newKeyWords)
    if (listen.length >= 2) {
      if (listen[0].toLowerCase() === 'hey' && listen[1].toLowerCase() === 'anna') {
        console.log('Hey Anna');
        setShouldITellThemIAmListening(true);
        resetTranscript();
        setListen(['', '']);
      }
    }

  }, [listen]);

  useEffect(() => {
    if (shouldITellThemIAmListening) {
      currentField(transcript);
      if (listen[0].toLowerCase() === 'stop' && listen[1].toLowerCase() === 'listening') {
        console.log('Stop listening');
        let finalThought = transcript;
        let lastIndex = finalThought.lastIndexOf(" ");
        finalThought = finalThought.substring(0, lastIndex)
        lastIndex = finalThought.lastIndexOf(" ");
        finalThought = finalThought.substring(0, lastIndex)
        console.log(finalThought)
        currentField(finalThought);
        setShouldITellThemIAmListening(false);
        resetTranscript();
        setListen(['', '']);
      }
    }
  }, [listen]);



  return (
    <div>
      <p>Powered by the future</p>
    </div>
  )
}
export default Dictaphone