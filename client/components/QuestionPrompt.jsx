import React, { useState } from 'react';

function QuestionPrompt({ promptsCount, addToPrompts }) {
  const [currentPrompt, setCurrentPrompt] = useState('');

  const handleChange = (event) => {
    setCurrentPrompt(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addToPrompts(prevPrompts => [...prevPrompts, currentPrompt]);
    setCurrentPrompt('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label> Question {promptsCount}
        <input
          name="question"
          value={currentPrompt}
          onChange={handleChange}
        />
      </label>
      <button>Add Another Prompt</button>
    </form>
  )
}


export default QuestionPrompt;