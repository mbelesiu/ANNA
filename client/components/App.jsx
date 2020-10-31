import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Dictaphone from './Dictaphone.jsx';
import QuestionPrompt from './QuestionPrompt.jsx';

function App(){
  const [init, setInit] = useState(true);
  const [prompts, setPrompts] = useState([]);





  return (
    <div>
      {init ? <QuestionPrompt promptsCount={prompts.length + 1} addToPrompts= {setPrompts}/> : <Dictaphone />}

    </div>
  )
}


export default App;