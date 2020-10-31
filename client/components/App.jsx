import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Dictaphone from './Dictaphone.jsx';
import QuestionPrompt from './QuestionPrompt.jsx';
import SignUp from './SignUp.jsx';

function App() {
  const [init, setInit] = useState(true);
  const [newUser, setNewUser] = useState(false);
  const [prompts, setPrompts] = useState([]);

  const getUserPrompts = (username) => {
    axios.get(`/api/login/${username}`)
    .then(({ data }) => console.log(data))
    .catch((err) => (err));
  }

  const submitPrompts = (e) => {
    e.preventDefault();
    const data = {};
    prompts.forEach((prompt, i) => { data[`question${i}`] = prompt })
    axios.post('/api/prompts/create', data)
      .then(() => setNewUser(false))
      .catch((err) => console.log(err))
  };
  const submitSignUp = (data) => {
    axios.post('/api/login/create', data)
      .then(() => setNewUser(false))
      .catch((err) => console.log(err))
  }


  return (
    <div>
      <SignUp showSignup={init} />
      {newUser ? <div>
        <QuestionPrompt promptsCount={prompts.length + 1} addToPrompts={setPrompts} />
        <button onClick={submitPrompts}>Finsih and Save</button>
        <p>{prompts}</p>
      </div> : <Dictaphone />}
    </div>
  )
}


export default App;