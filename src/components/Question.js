import React, { useState, useEffect } from 'react';

const Question = ({ question, onAnswered }) => {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Set up a timer using setTimeout
    const timer = setTimeout(() => {
      // Decrease the time remaining by 1 every second
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup function for useEffect
    return () => {
      clearTimeout(timer);
    };
  }, [timeRemaining]); // Dependency array to avoid warnings

  useEffect(() => {
    // Check if timeRemaining is 0
    if (timeRemaining === 0) {
      // Reset timeRemaining to 10 seconds for the next question
      setTimeRemaining(10);

      // Trigger behavior in the App component by calling onAnswered with false
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]); // Dependency array to avoid warnings
  
  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}


export default Question;
