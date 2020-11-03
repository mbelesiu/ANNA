import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const Dictaphone = () => {
  const { transcript, resetTranscript } = useSpeechRecognition()
  const [listen, setListen] = useState([]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }
  SpeechRecognition.startListening({ continuous: true })
  useEffect(() => {
    const newKeyWords = transcript.split(" ").slice(-2)
    setListen(newKeyWords)
    if (listen.length >= 2) {
      if (listen[0].toLowerCase() === 'hey' && listen[1].toLowerCase() === 'anna') {
        console.log('Hey Anna');
        resetTranscript();
        setListen(['','']);
      }
      if (listen[0].toLowerCase() === 'stop' && listen[1].toLowerCase() === 'listening') {
        console.log('Stop listening');
        resetTranscript();
        setListen(['','']);
      }
    }

  }, [listen])


  return (
    <div>
      {/* <button onClick={SpeechRecognition.startListening({ continuous: true })}>Start</button> */}
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{listen[0]}{listen[1]}</p>
    </div>
  )
}
export default Dictaphone