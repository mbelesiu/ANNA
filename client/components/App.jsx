import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import axios from 'axios';
import Dictaphone from './Dictaphone.jsx';
import QuestionPrompt from './QuestionPrompt.jsx';
import SignUp from './SignUp.jsx';
import Records from './Records.jsx';
import Entry from './Entry.jsx';

const dummyRecordData = [
  {
    id: '1',
    date: 'March 5th, 1992',
    body: 'In west Phill'
  },
  {
    id: '2',
    date: 'March 5th, 1992',
    body: 'Born and raised'
  },
  {
    id: '3',
    date: 'March 5th, 1992',
    body: 'oN A PLAYGROUND i SPENT MOST OF MY DAYS'
  }

]

function App() {
  const [init, setInit] = useState(true);
  const [newUser, setNewUser] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const [finalQuestion, setFinalQuestion] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [records, setRecords] = useState(dummyRecordData);
  const [currentRecord, setCurrentRecord] = useState(false);
  const [promptTime, setPromptTime] = useState(false); //allowing user to answer prompt
  const [showPromptModal, setshowPromptModal] = useState(false); //show quetionaire

  const getUserPrompts = (username) => {
    axios.get(`/api/login/${username}`)
      .then(({ data }) => console.log('matt here', data))
      .catch((err) => (err));
  }

  const submitPrompts = (e) => {
    e.preventDefault();
    if (!finalQuestion) {
      setFinalQuestion(true);
    } else {
      const data = {};
      prompts.forEach((prompt, i) => {
        if (i === prompts.length - 1) {
          data["EOD"] = prompt
        } else {
          data[`question${i}`] = prompt
        }
      })
      axios.post(`/api/prompts/create/${currentUser}`, data)
        .then(() => setNewUser(false))
        .catch((err) => console.log(err))
    }

  };
  const submitSignUp = (user) => {
    axios.get(`/api/login/${user}`)
      .then(({ data }) => {
        data = data[0].prompts;
        for (prompt in data) {
          if (prompt !== 'EOD') {
            setPrompts(prevPrompts => [...prevPrompts, data[prompt]]);
          }

        }
        setCurrentUser(user);
        data === "OK" ? setNewUser(true) : setNewUser(false);
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
      </div> : <div><Entry record={currentRecord} /> <Records records={records} showRecord={setCurrentRecord} /></div>}
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