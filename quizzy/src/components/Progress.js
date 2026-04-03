import React from "react";

function Progress({ numOfQuestions, currentIndex, score, totalScore }) {
  return (
    <header className="progress">
      <progress value={currentIndex} max={numOfQuestions} />
      <p>
        Question {currentIndex + 1} of {numOfQuestions}
      </p>
      <p>
        Score: {score}/{totalScore}
      </p>
    </header>
  );
}

export default Progress;
