import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const Dictaphone = () => {
  const { transcript, resetTranscript } = useSpeechRecognition()
  const listen = [];

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }
  SpeechRecognition.startListening({ continuous: true })
  listen.push(transcript.split(" ").pop())
  console.log(Array.isArray(transcript))

  return (
    <div>
      {/* <button onClick={SpeechRecognition.startListening({ continuous: true })}>Start</button> */}
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{listen}</p>
    </div>
  )
}
export default Dictaphone