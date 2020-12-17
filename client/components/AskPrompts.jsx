import React, { useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import { Modal, Button, Textarea } from 'react-materialize';
import ANNA from './ANNA.jsx';

function AskPrompts({ prompts, getPrompts, currentUser, showPrompts, hidePrompts, responses, setResponses, submitRecord }) {
  const [currentPrompt, setCurrentPrompt] = useState();
  const [currentResponse, setCurrentResponse] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0);
  let kill = false

  const handleSubmit = (e) => {
    e.preventDefault();
    const r = responses;
    r.push(currentResponse);
    setResponses(r);
    setCurrentQuestion(currentQuestion + 1);
    setCurrentResponse('');
    if (currentQuestion === prompts.length - 1) {
      setCurrentQuestion(0);
      hidePrompts(false);
      submitRecord();
    }
  }
  useEffect(() => {
    setCurrentPrompt(prompts[currentQuestion]);
  })
  useEffect(()=>{
    getPrompts(currentUser);
  },[showPrompts])

  if (!showPrompts) {
    return null;
  }
  return (
    <Modal
      actions={[
        <Button flat modal="close" node="button" waves="green">Nevermind...</Button>
      ]}
      bottomSheet={false}
      fixedFooter={false}
      header="Please Answer the Following Prompts"
      id="Modal-0"
      open={true}
      options={{
        dismissible: false,
        endingTop: '10%',
        inDuration: 250,
        onCloseEnd: (() => (hidePrompts(false))),
        onCloseStart: (() => (kill = true)),
        onOpenEnd: null,
        onOpenStart: null,
        opacity: 0.5,
        outDuration: 250,
        preventScrolling: true,
        startingTop: '4%'
      }}
    >

      <form onSubmit={handleSubmit}>
        <label> {currentPrompt}
          <Textarea
            name={`question${currentQuestion}`}
            type="text"
            value={currentResponse}
            onChange={(e) => setCurrentResponse(e.target.value)}
          />
        </label>
        <Button>{currentQuestion !== (prompts.length - 1) ? 'Next Prompt' : 'Submit Record'}</Button>
      </form>
      <ANNA currentField={setCurrentResponse} kill={!showPrompts} />

    </Modal>
  )
}

export default AskPrompts;