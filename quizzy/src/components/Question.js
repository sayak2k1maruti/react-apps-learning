import React from "react";
import Option from "./Option";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Footer from "./Footer";
import Timer from "./Timer";

function Question({
  question,
  dispatch,
  selectedAnswer,
  currentIndex,
  numOfQuestions,
  score,
  totalScore,
  timeRemaining,
}) {
  return (
    <div className="question">
      <Progress
        numOfQuestions={numOfQuestions}
        currentIndex={currentIndex}
        score={score}
        totalScore={totalScore}
      />
      <h4>{question?.question}</h4>
      <div className="options">
        {question?.options.map((option, index) => {
          return (
            <Option
              key={option}
              index={index}
              option={option}
              question={question}
              dispatch={dispatch}
              selectedAnswer={selectedAnswer}
            />
          );
        })}
      </div>
      <Footer>
        {selectedAnswer !== null && (
          <NextButton
            dispatch={dispatch}
            currentIndex={currentIndex}
            numOfQuestions={numOfQuestions}
          />
        )}
        <Timer dispatch={dispatch} timeRemaining={timeRemaining} />
      </Footer>
    </div>
  );
}

export default Question;
