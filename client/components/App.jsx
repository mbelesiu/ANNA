import React, { useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import { Button } from 'react-materialize';
import styled from 'styled-components';
import axios from 'axios';
import Dictaphone from './Dictaphone.jsx';
import QuestionPrompt from './QuestionPrompt.jsx';
import SignUp from './SignUp.jsx';
import Records from './Records.jsx';
import Entry from './Entry.jsx';
import AskPrompts from './AskPrompts.jsx';
import NavBar from './NavBar.jsx';



function App() {
  const [init, setInit] = useState(true);
  const [newUser, setNewUser] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const [finalQuestion, setFinalQuestion] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [records, setRecords] = useState({});
  const [currentRecord, setCurrentRecord] = useState(false);
  const [promptTime, setPromptTime] = useState(false); //allowing user to answer prompt
  const [showPromptModal, setShowPromptModal] = useState(false); //show quetionaire
  const [responses, setResponses] = useState({});
  const [flag, setFlag] = useState(false);

  const getUserPrompts = (username) => {
    setPrompts([])
    axios.get(`/api/prompts/${username}`)
      .then(({ data }) => {
        data = data[0].prompts;
        for (prompt in data) {
          if (prompt !== 'EOD') {
            setPrompts(prevPrompts => [...prevPrompts, data[prompt]]);
          }
        }
      })
      .catch((err) => (err));
  }

  const getUserRecords = () => {
    axios.get(`/api/records/${currentUser}`)
      .then(({ data }) => {
        setRecords(data[0].entry);
      })
      .catch((err) => (err));
  }

  const submitRecord = () => {
    const date = new Date()
    const newRecord = { date: date.toDateString() }
    newRecord['body'] = responses;
    axios.post(`/api/records/create/${currentUser}`, newRecord)
      .then(() => getUserRecords())
      .catch((err) => console.log(err));
  }

  const submitPrompts = () => {
    if (!flag) {
      setFlag(true);
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
        .then(() => {
          setNewUser(false);
          getUserPrompts(currentUser);
        })
        .catch((err) => console.log(err))
    }
  };


  const submitSignUp = (user) => {

    axios.get(`/api/login/${user}`)
      .then(({ data }) => {
        setCurrentUser(user);
        if (data === "OK") {
          setNewUser(true)
        } else {
          setNewUser(false);
          data = data[0].prompts;
          for (prompt in data) {
            if (prompt !== 'EOD') {
              setPrompts(prevPrompts => [...prevPrompts, data[prompt]]);
            }
          }
        }
      })
      .catch((err) => console.log(err))


  }

  useEffect(() => {
    if (flag) {
      submitPrompts()
      setFinalQuestion(false);
      setFlag(false);
    }
  }, [prompts]);

  useEffect(() => {
    getUserRecords()
  }, [currentUser])

  return (
    <Wrapper>
      <NavBar />
      <AskPrompts
        prompts={prompts}
        showPrompts={showPromptModal}
        hidePrompts={setShowPromptModal}
        responses={responses}
        setResponses={setResponses}
        submitRecord={submitRecord}
      />
      <SignUp display={init} showSignup={setInit} dataSend={submitSignUp} />

      <QuestionPrompt promptsCount={prompts.length + 1} addToPrompts={setPrompts} finalQuestion={finalQuestion} setFinalQuestion={setFinalQuestion} showQuestions={newUser} submitPrompts={submitPrompts} setFlag={setFlag} />
      <Right>
      <h3>Entry</h3>
        <Entry record={currentRecord} hideCurrentRecord={() => setCurrentRecord(false)} />
      </Right>
      <Left>
        <h3>Previous Entries</h3>
        <Records records={records} showRecord={setCurrentRecord} />
        <Button onClick={() => setShowPromptModal(true)}>SHOW ME THE PROMPTS</Button>
      </Left>

    </Wrapper>
  )
}

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.div`
  width:100%;
  height: 100%;
  padding: 4em;
  background: papayawhip;
  position: absolute;
`;
const Left = styled.div`
  float: left;
  width: 50%;
`;
const Right = styled.div`
  float: right;
  width: 50%;
`;

export default App;