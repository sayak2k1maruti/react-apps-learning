import React from "react";

function Option({ selectedAnswer, option, question, index, dispatch }) {
  let btnClassName = "btn btn-option";
  if (selectedAnswer === index) {
    btnClassName += " answer";
  }
  if (selectedAnswer !== null) {
    btnClassName += index === question.correctOption ? " correct" : " wrong";
  }
  return (
    <button
      className={btnClassName}
      key={index}
      disabled={selectedAnswer !== null}
      onClick={() => dispatch({ type: "newAnswer", payload: index })}
    >
      {option}
    </button>
  );
}

export default Option;
