import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function ChangePrompts({ prompts, show, changeShow, getPrompts, currentUser}) {
  const [promptList, setPromptList] = useState([]);
  const [time, setTime] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    changeShow(false);
  }

  const handleChange = (value, index) => {
    let tempList = promptList;
    tempList[index] = value;
    setPromptList(tempList);
  }
  useEffect(() => {
    setPromptList(prompts);
  })

  useEffect(()=>{
    getPrompts(currentUser);
  },[show])

  if (!show) {
    return null;
  }
  console.log(promptList)
  return (
    <Modal>
      <ModalContent>
        <h5>Change Prompts for future entries</h5>
        <form onSubmit={(e) => { handleSubmit(e) }}>
          {promptList.map((prompt, i) =>
            <label> <h6>Current Prompt {i + 1}: {prompt}</h6>
              <input
                name={prompt}
                value={prompt}
                onChange={(e) => handleChange(e.target.value, i)}
              />
            </label>
          )}

          <button>Submit Change</button><button onClick={(e) => { changeShow(false) }}>Cancel</button>
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


export default ChangePrompts;