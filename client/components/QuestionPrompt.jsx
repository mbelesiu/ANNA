import React, { useState } from 'react';

function QuestionPrompt({ promptsCount, addToPrompts, finalQuestion }) {
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [time, setTime] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    addToPrompts(prevPrompts => [...prevPrompts, currentPrompt]);
    setCurrentPrompt('');
  }
  if (finalQuestion) {
    return (
      <form onSubmit={handleSubmit}>
        <label> What Time of day would you like to be prompted with these questions?
          <input
            name="EOD"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
        <button>Submit!</button>
      </form>
    )
  }
  return (
    <form onSubmit={handleSubmit}>
      <label> Question {promptsCount}
        <input
          name="question"
          value={currentPrompt}
          onChange={(e) => setCurrentPrompt(e.target.value)}
        />
      </label>
      <button>Add Another Prompt</button>
    </form>
  )
}


export default QuestionPrompt;