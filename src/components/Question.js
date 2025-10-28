import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    let timerId;
    let count = 10;

    function tick() {
      count--;
      setTimeRemaining(count);
      if (count > 0) {
        timerId = setTimeout(tick, 1000);
      } else {
        onAnswered(false);
      }
    }

    timerId = setTimeout(tick, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

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
