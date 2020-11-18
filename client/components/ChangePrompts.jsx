import React, { useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import { Modal, Button, Textarea } from 'react-materialize';
import styled from 'styled-components';

function ChangePrompts({ prompts, show, changeShow, getPrompts, currentUser}) {
  const [promptList, setPromptList] = useState();
  const [toggle, setToggle] = useState(true); // for some reason, the state will not rerender for a modifcation of prompts, so I had to add an extra something
  const [time, setTime] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    changeShow(false);
  }

  const handleChange = (value, index) => {
    let tempList = promptList;
    tempList[index] = value;
    console.log(tempList[index])
    setPromptList(tempList);
    setToggle(!toggle);
    // console.log(promptList)
  }
  const addPrompt = () => {
    let tempList = promptList;
    tempList.push('');
    setPromptList(tempList);
    setToggle(!toggle);
  }

  useEffect(()=>{
    // console.log('I should only happen when the modal pops up')
    getPrompts(currentUser);
  },[show])

  useEffect(() => {
    // console.log('im setting propts when promts are changed')
    setPromptList(prompts);
  },[prompts])


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
          {console.log(promptList)}
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

          <Button>Submit Change</Button>
        </form>
        <Button onClick={addPrompt}>Add a Prompt</Button>

    </Modal>

  )
}



export default ChangePrompts;