import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Starter from "./components/Starter";
import Question from "./components/Question";
import Result from "./components/Result";

const TIME_PER_QUESTION = 10;

const initialState = {
  questions: [],
  state: "loading",
  currentIndex: 0,
  score: 0,
  currentSelectedAnswer: null,
  highScore: 0,
  timeRemaining: 10,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        state: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        state: "error",
      };
    case "startQuiz":
      return {
        ...state,
        state: "active",
        timeRemaining: TIME_PER_QUESTION * state.questions.length,
      };
    case "newAnswer":
      const question = state.questions.at(state.currentIndex);
      return {
        ...state,
        currentSelectedAnswer: action.payload,
        score:
          action.payload === question.correctOption
            ? state.score + question.points
            : state.score,
      };
    case "nextQuestion":
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        currentSelectedAnswer: null,
      };
    case "finishQuiz":
      return {
        ...state,
        state: "finished",
        highScore:
          state.score > state.highScore ? state.score : state.highScore,
      };
    case "restartQuiz":
      return {
        ...state,
        state: "ready",
        currentIndex: 0,
        selectedAnswer: null,
        score: 0,
        timeRemaining: TIME_PER_QUESTION * state.questions.length,
      };
    case "tick":
      if (state.timeRemaining < 1) {
        setTimeout(() => alert("Time's up!"), 2000);
      }
      return {
        ...state,
        state: state.timeRemaining < 1 ? "finished" : state.state,
        timeRemaining: state.timeRemaining - 1,
      };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [
    {
      state,
      questions,
      currentIndex,
      currentSelectedAnswer,
      score,
      highScore,
      timeRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numOfQuestions = questions.length;
  const totalScore = questions.reduce(
    (total, question) => total + question.points,
    0,
  );

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => {
        console.error("Error fetching questions:", error);
        dispatch({ type: "dataFailed" });
      });
  }, []);

  return (
    <main className="app">
      <Header />
      {state === "loading" && <Loader />}
      {state === "error" && <Error />}
      {state === "ready" && (
        <Starter numOfQuestions={numOfQuestions} dispatch={dispatch} />
      )}
      {state === "finished" && (
        <Result
          score={score}
          totalScore={totalScore}
          highscore={highScore}
          dispatch={dispatch}
        />
      )}
      {state === "active" && (
        <Question
          question={questions[currentIndex]}
          dispatch={dispatch}
          selectedAnswer={currentSelectedAnswer}
          currentIndex={currentIndex}
          numOfQuestions={numOfQuestions}
          score={score}
          totalScore={totalScore}
          timeRemaining={timeRemaining}
        />
      )}
    </main>
  );
}
