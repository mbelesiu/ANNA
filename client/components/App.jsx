import React, { useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import { Button } from 'react-materialize';
import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components';
import axios from 'axios';
import QuestionPrompt from './QuestionPrompt.jsx';
import Records from './Records.jsx';
import Entry from './Entry.jsx';
import AskPrompts from './AskPrompts.jsx';
import ChangePrompts from './ChangePrompts.jsx';
import NavBar from './NavBar.jsx';
import LoginButton from './LoginButton.jsx';
import LogoutButton from './LogoutButton.jsx';
import Profile from './Profile.jsx'
import MyCalendar from './MyCalendar.jsx';




function App() {
  const [init, setInit] = useState(true);
  const [newUser, setNewUser] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const [finalQuestion, setFinalQuestion] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [records, setRecords] = useState({});
  const [currentRecord, setCurrentRecord] = useState(false);
  const [promptTime, setPromptTime] = useState(false); //allowing user to answer prompt
  const [showPromptModal, setShowPromptModal] = useState(false); //show quetionaire
  const [showChangePromptModal, setShowChangePromptModal] = useState(false);
  const [responses, setResponses] = useState([]);
  const [flag, setFlag] = useState(false);
  const [time, setTime] = useState();

  const getUserPrompts = (username) => {
    setPrompts([])
    axios.get(`/api/prompts/${username}`)
      .then(({ data }) => {
        //with postgres, youll probably have to remove the curly brackets
        //also since you are getting it as an array obj, you might be in luck
        // let temp = [];
        // data = data[0].prompts;
        // for (prompt in data) {
        //   if (prompt === 'EOD') {
        //     setTime(data[prompt]);
        //   } else {
        //     temp.push(data[prompt]);
        //   }
        // }
        // temp.reverse()
        setPrompts(data[0].prompts)
      })
      .catch((err) => (err));
  }
  const updatePrompts = (newPrompts) => {
    const data = {};
    newPrompts.forEach((prompt, i) => {
      if (i === prompts.length - 1) {
        data["EOD"] = prompt
      } else {
        data[`question${i}`] = prompt
      }
    })
    axios.put(`/api/prompts/update/${currentUser}`, data)
      .then(() => getUserPrompts())
      .catch((err) => console.log(err));
    setShowChangePromptModal(false)
  }

  const getUserRecords = () => {
    axios.get(`/api/records/${currentUser}`)
      .then(({ data }) => {
        const currentRecords = {};
        for (let i = 0; i < data[0].entry.length; i++){
          // console.log(`records from get ${data[0].entry[i]}`);
          currentRecords[data[0].prompts[i]] = data[0].entry[i]
        }
        console.log(currentRecords)
        // setRecords(currentRecords);
      })
      .catch((err) => (err));
  }

  const submitRecord = () => {
    const date = new Date()
    const newRecord = { date: date.toDateString() }
    newRecord['entry'] = responses;
    axios.post(`/api/records/create/${currentUser}`, newRecord)
      .then(() => getUserRecords())
      .catch((err) => console.log(err));
  }

  const submitPrompts = () => {
    if (!flag) {
      setFlag(true);
    } else {
      const data = {
        "prompts" : prompts.splice(0,prompts.length-1),
        "eod" : prompts[prompts.length-1]
      };
      // prompts.forEach((prompt, i) => {
      //   if (i === prompts.length - 1) {
      //     data["EOD"] = prompt
      //   } else {
      //     data[`question${i}`] = prompt
      //   }
      // })
      axios.post(`/api/prompts/create/${currentUser}`, data)
        .then(() => {
          setNewUser(false);
        })
        .catch((err) => console.log(err))
    }
  };


  const submitSignUp = () => {
    if (currentUser) {
      axios.get(`/api/login/${currentUser}`)
        .then(({ data }) => {
           setCurrentUser(currentUser);
          if (data === "OK") {

            setNewUser(true)
          } else {
            setNewUser(false);
            data = data[0].prompts;
            for (prompt in data) {
                setPrompts(prevPrompts => [...prevPrompts, data[prompt]]);
            }
          }
        })
        .catch((err) => console.log(err))

    }
  }

  const sendLogout = () => {
    axios.get(`/logout`)
      .then((response) => console.log(response))
      .catch((err) => console.log(err))
  }
  const sendLogin = () => {
    axios.get(`/login`)
      .then((response) => console.log(response))
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
    submitSignUp()
  }, [currentUser])

  return (
    <Wrapper>
      <Profile setCurrentUser={setCurrentUser} getUserRecords={getUserRecords} currentUser={currentUser}/>
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
        changeShow={setShowChangePromptModal}
        getPrompts={getUserPrompts}
        currentUser={currentUser}
        currentTime={time}
        updatePrompts={updatePrompts}
      />
      {/* <SignUp display={init} showSignup={setInit} dataSend={submitSignUp} /> */}

      <QuestionPrompt promptsCount={prompts.length + 1} addToPrompts={setPrompts} finalQuestion={finalQuestion} setFinalQuestion={setFinalQuestion} showQuestions={newUser} submitPrompts={submitPrompts} setFlag={setFlag} />
      <Right>
        <h3>Entry</h3>
        <Entry record={currentRecord} hideCurrentRecord={() => setCurrentRecord(false)} />
      </Right>
      <Left>
        <h3>Previous Entries</h3>
        <Button onClick={() => setShowPromptModal(true)}>ANSWER TODAY'S PROMPTS</Button>
        <Button onClick={() => setShowChangePromptModal(true)}>UPDATE PROMPTS</Button>
        <MyCalendar records={records} showRecord={setCurrentRecord}/>
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
  padding: 1.5em;
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