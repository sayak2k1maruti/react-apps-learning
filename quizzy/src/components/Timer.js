import { useEffect } from "react";

function Timer({ timeRemaining, dispatch }) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  useEffect(
    function () {
      const timerId = setInterval(() => dispatch({ type: "tick" }), 1000);
      return () => clearInterval(timerId);
    },
    [dispatch],
  );
  return (
    <div className="timer">
      ⏰ {minutes}:{seconds}
    </div>
  );
}

export default Timer;
