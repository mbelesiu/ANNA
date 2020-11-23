import React, { useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import { Modal, Button, Textarea } from 'react-materialize';
import styled from 'styled-components';

function ChangePrompts({ prompts, show, changeShow, getPrompts, currentUser, currentTime, updatePrompts }) {
  const [promptList, setPromptList] = useState();
  const [time, setTime] = useState(currentTime);
  const [toggle, setToggle] = useState(true); // for some reason, the state will not rerender for a modifcation of prompts, so I had to add an extra something


  const handleSubmit = (e) => {
    e.preventDefault();
    let tempList = promptList;
    tempList.push(time);
    setPromptList(tempList);
    updatePrompts(promptList)
  }

  const handleChange = (value, index) => {
    let tempList = promptList;
    tempList[index] = value;
    setPromptList(tempList);
    setToggle(!toggle);
  }

  const addPrompt = () => {
    let tempList = promptList;
    tempList.push('');
    setPromptList(tempList);
    setToggle(!toggle);
  }

  useEffect(() => {
    getPrompts(currentUser);
  }, [show])

  useEffect(() => {
    setPromptList(prompts);
    setTime(currentTime)
  }, [prompts])


  if (!show) {
    return null;
  }
  return (
    <Modal
      actions={[
        <Button flat modal="close" node="button" waves="green">Nevermind...</Button>
      ]}
      bottomSheet={false}
      fixedFooter={false}
      header="Change Prompts for Future Entries"
      id="Modal-0"
      open={true}
      options={{
        dismissible: false,
        endingTop: '10%',
        inDuration: 250,
        onCloseEnd: (() => (changeShow(false))),
        onCloseStart: (() => (setPromptList([]))),
        onOpenEnd: null,
        onOpenStart: null,
        opacity: 0.5,
        outDuration: 250,
        preventScrolling: true,
        startingTop: '4%'
      }}
    >

      <form onSubmit={(e) => { handleSubmit(e) }}>
        {promptList.map((prompt, i) =>
          <label> <h6>Current Prompt {i + 1}</h6>
            <Textarea
              name={prompt}
              type="text"
              value={prompt}
              onChange={(e) => handleChange(e.target.value, i)}
            />
          </label>
        )}
        <label> <h6>Change Time</h6>
          <input
            name='EOD'
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>

        <Button>Submit Change</Button>
      </form>
      <Button onClick={addPrompt}>Add a Prompt</Button>

    </Modal>

  )
}



export default ChangePrompts;