import React from "react";

function Starter({ numOfQuestions, dispatch }) {
  function handleClick() {
    dispatch({ type: "startQuiz" });
  }
  return (
    <div className="start">
      <h2> Welcome to The React Quiz! </h2>
      <h3> {numOfQuestions} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={handleClick}>
        Let's Start
      </button>
    </div>
  );
}

export default Starter;
