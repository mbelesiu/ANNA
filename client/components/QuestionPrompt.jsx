import React, { useState, useEffect } from 'react';

function QuestionPrompt({ promptsCount, addToPrompts }) {
  const [currentPrompt, setCurrentPrompt] = useState('');

  const handleChange = (event) => {
    setCurrentPrompt(event.value);
  }
  useEffect(() => {
    //doSomething
    console.log(currentPrompt);
  })

  return (
    <form>
      <label> Question {promptsCount}
        <input
          name="question"
          value={currentPrompt}
          onChange={handleChange}
        />
      </label>
      <button>Add Another Prompt</button><button>Finsih and Save</button>
    </form>
  )
}


export default QuestionPrompt;