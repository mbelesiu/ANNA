import React, { useState } from 'react';

function QuestionPrompt({ promptsCount, addToPrompts, finalQuestion }) {
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [time, setTime] = useState('');
  const currentQuestion = `question${promptsCount}`;

  const handleSubmit = (event) => {
    event.preventDefault();
    const promptToAdd = finalQuestion ? time : currentPrompt;
    addToPrompts(prevPrompts => [...prevPrompts, promptToAdd]);
    setCurrentPrompt('');
  }
  if (finalQuestion) {
    return (
      <form onSubmit={handleSubmit}>
        <label> What Time of day would you like to be prompted with these questions?
          <input
            name="EOD"
            type="time"
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
          name={currentQuestion}
          value={currentPrompt}
          onChange={(e) => setCurrentPrompt(e.target.value)}
        />
      </label>
      <button>Add Another Prompt</button>
    </form>
  )
}


export default QuestionPrompt;