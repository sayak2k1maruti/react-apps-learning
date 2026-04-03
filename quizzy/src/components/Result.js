import React from "react";

function Result({ dispatch, score, totalScore, highscore }) {
  const percentage = Math.round((score / totalScore) * 100);
  function getEmoji() {
    if (percentage === 100) {
      return "🏆";
    } else if (percentage >= 90) {
      return "🥳";
    } else if (percentage >= 80) {
      return "🎉";
    } else if (percentage >= 50) {
      return "👍";
    } else {
      return "😢";
    }
  }
  return (
    <div className="main">
      <p className="result">
        {getEmoji()} You scored {score} out of {totalScore} ({percentage}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restartQuiz" })}
      >
        Play Again
      </button>
    </div>
  );
}

export default Result;
