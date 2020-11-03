import React, { useState } from 'react';
import styled from 'styled-components';

function AskPrompts({ prompts, showPrompts }) {
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [response, setResponse] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleSubmit = (event) => {
    const r = {`question${currentQuestion + 1}`: currentPrompt
  };
  setResponse({ ...response, r });
  setCurrentQuestion(currentQuestion + 1);
}

useEffect(() => {

}, [currentQuestion])

if (!showPrompts) {
  return null;
}

return (
  <Modal>
    <ModalContent>
      <form onSubmit={handleSubmit}>
        <label> {currentQuestion}
          <input
            name={currentQuestion}
            type="text"
            value={currentPrompt}
            onChange={(e) => setCurrentPrompt(e.target.value)}
          />
        </label>
        <button>{currentQuestion !== prompts.length - 1 ? 'Next Prompt' : 'Submit Record'}</button>
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