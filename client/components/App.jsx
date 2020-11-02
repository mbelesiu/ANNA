import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import axios from 'axios';
import Dictaphone from './Dictaphone.jsx';
import QuestionPrompt from './QuestionPrompt.jsx';
import SignUp from './SignUp.jsx';


function App() {
  const [init, setInit] = useState(true);
  const [newUser, setNewUser] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const [finalQuestion, setFinalQuestion] = useState(false);

  const getUserPrompts = (username) => {
    axios.get(`/api/login/${username}`)
      .then(({ data }) => console.log(data))
      .catch((err) => (err));
  }

  const submitPrompts = (e) => {
    e.preventDefault();
    if (!finalQuestion) {
      setFinalQuestion(true);
    } else {
      const data = {};
      prompts.forEach((prompt, i) => { data[`question${i}`] = prompt })
      axios.post('/api/prompts/create', data)
        .then(() => setNewUser(false))
        .catch((err) => console.log(err))
    }

  };
  const submitSignUp = (data) => {
    axios.get(`/api/login/${data}`)
      .then(({ data }) => {
        console.log(data)
        data === "OK" ? setNewUser(true) : setNewUser(false)
      })
      .catch((err) => console.log(err))
  }


  return (
    <Wrapper>
      <SignUp display={init} showSignup={setInit} dataSend={submitSignUp} soFetch={getUserPrompts} />
      {newUser ? <div>
        <QuestionPrompt promptsCount={prompts.length + 1} addToPrompts={setPrompts} finalQuestion={finalQuestion} />
        <button onClick={submitPrompts}>Finsih and Save</button>
        <p>{prompts}</p>
      </div> : <Dictaphone />}
    </Wrapper>
  )
}
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.div`
  padding: 4em;
  background: papayawhip;
`;

export default App;