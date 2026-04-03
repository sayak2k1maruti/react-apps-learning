import React from "react";

function NextButton({ dispatch, currentIndex, numOfQuestions }) {
  if (currentIndex > numOfQuestions - 1) {
    return null;
  }
  if (currentIndex === numOfQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finishQuiz" })}
      >
        Finish Quiz 🎉
      </button>
    );
  }
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next Question 👉
    </button>
  );
}

export default NextButton;
