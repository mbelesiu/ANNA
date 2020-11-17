import React, { useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import { Button } from 'react-materialize';
import styled from 'styled-components';
import axios from 'axios';
import QuestionPrompt from './QuestionPrompt.jsx';
import SignUp from './SignUp.jsx';
import Records from './Records.jsx';
import Entry from './Entry.jsx';
import AskPrompts from './AskPrompts.jsx';
import ChangePrompts from './ChangePrompts.jsx';
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
  const [showChangePromptModal, setShowChangePromptModal] = useState(false);
  const [responses, setResponses] = useState({});
  const [flag, setFlag] = useState(false);

  const getUserPrompts = (username) => {
    setPrompts([])

    axios.get(`/api/prompts/${username}`)
      .then(({ data }) => {
        let temp = []
        data = data[0].prompts;
        for (prompt in data) {
          if (prompt !== 'EOD') {
            temp.push(data[prompt])
          }
        }
        temp.reverse()
        setPrompts(temp)
      })
      .catch((err) => (err));
  }

  const getUserRecords = () => {
    axios.get(`/api/records/${currentUser}`)
      .then(({ data }) => {
        setRecords(data[0].entry.reverse());
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
        getPrompts={getUserPrompts}
        currentUser={currentUser}
        showPrompts={showPromptModal}
        hidePrompts={setShowPromptModal}
        responses={responses}
        setResponses={setResponses}
        submitRecord={submitRecord}
      />
      <ChangePrompts
      prompts={prompts}
      show={showChangePromptModal}
      changeShow = {setShowChangePromptModal}
      getPrompts = {getUserPrompts}
      currentUser={currentUser}
      />
      <SignUp display={init} showSignup={setInit} dataSend={submitSignUp} />

      <QuestionPrompt promptsCount={prompts.length + 1} addToPrompts={setPrompts} finalQuestion={finalQuestion} setFinalQuestion={setFinalQuestion} showQuestions={newUser} submitPrompts={submitPrompts} setFlag={setFlag} />
      <Right>
        <h3>Entry</h3>
        <Entry record={currentRecord} hideCurrentRecord={() => setCurrentRecord(false)} />
      </Right>
      <Left>
        <h3>Previous Entries</h3>
        <Button onClick={() => setShowPromptModal(true)}>SHOW ME THE PROMPTS</Button>
        <Button onClick={() => setShowChangePromptModal(true)}>LETS CHANGE THE PROMPTS</Button>
        <Records records={records} showRecord={setCurrentRecord} />

      </Left>
      <Footer>
        A.N.N.A MK.1
        By Matthew James Belesiu
      </Footer>

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
const Footer = styled.div`

  position: fixed;
  float: right;
  right: 1em;
  bottom: 0;
  width: 100%;
  background-color: papayawhip;
  text-align: right;
`;

export default App;