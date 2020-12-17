import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function QuestionPrompt({ promptsCount, addToPrompts, finalQuestion, setFinalQuestion, showQuestions, submitPrompts, setFlag }) {
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [time, setTime] = useState('');
  const currentQuestion = `question${promptsCount}`;

  const handleSubmit = (event, flag1, flag2) => {
    event.preventDefault();
    const promptToAdd = finalQuestion ? time : currentPrompt;
    addToPrompts(prevPrompts => [...prevPrompts, promptToAdd]);
    setCurrentPrompt('');
    if(flag1){
      setFinalQuestion(true);
    }
    if(flag2){
      setFlag(true)
    }

  }
  if (!showQuestions) {
    return null;
  }
  if (finalQuestion) {
    return (
      <Modal>
        <ModalContent>
          <form onSubmit={(e)=>{handleSubmit(e, true, true)}}>
            <label> <h5>Final Question, What Time of day would you like to be prompted with these questions?</h5>
          <input
                name="EOD"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </label>
            <button>Submit!</button>
          </form>
        </ModalContent>
      </Modal>

    )
  }

  return (
    <Modal>
      <ModalContent>
        <form onSubmit={(e)=>{handleSubmit(e, false, false)}}>
          <label> <h5>Please Enter a Prompt for Question {promptsCount}</h5>
            <input
              name={currentQuestion}
              value={currentPrompt}
              onChange={(e) => setCurrentPrompt(e.target.value)}
            />
          </label>
          <button>Add Another Prompt</button><button onClick={(e)=>{handleSubmit(e, true, false)}}>Set Time of Day</button>
        </form>
      </ModalContent>
    </Modal>

  )
}

const Modal = styled.div`

  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
`;


export default QuestionPrompt;