import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function AskPrompts({ prompts, showPrompts, hidePrompts, responses, setResponses}) {
  const [currentPrompt, setCurrentPrompt] = useState();
  const [currentResponse, setCurrentResponse] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const question = `question${currentQuestion + 1}`
    const r = responses;
    r[question] = currentResponse;
    console.log(r);
    setResponses(r);
    setCurrentQuestion(currentQuestion + 1);
    setCurrentResponse('');
    if (currentQuestion === prompts.length-1) {
      setCurrentQuestion(0);
      hidePrompts(false);
    }
  }

  useEffect(() => {
    setCurrentPrompt(prompts[currentQuestion]);
  })

  if (!showPrompts) {
    return null;
  }

  return (
    <Modal>
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <label> {currentPrompt}
            <input
              name={`question${currentQuestion}`}
              type="text"
              value={currentResponse}
              onChange={(e) => setCurrentResponse(e.target.value)}
            />
          </label>
          <button>{currentQuestion !== (prompts.length - 1) ? 'Next Prompt' : 'Submit Record'}</button>
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

export default AskPrompts;