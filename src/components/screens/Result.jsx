import React, { useEffect, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { resetResultAction } from "../../redux/resultReducer";
import { resetAction } from "../../redux/questionReducer";
import { userResults } from "../../hooks/setRes.js";

export const earnPointsFn = (result, answers) => {
  return result.map((userInput, i) => {
    const correctAnswer = answers[i].answer || answers[i]; // Either handle `answer` or directly the value
    const questionType = answers[i].type || "default"; 

    if (questionType === "descriptive") {
      const descriptiveScore = Math.floor(Math.random() * 6) + 5;
      return descriptiveScore;
    }

    if (questionType === "fill-in-the-blank") {

      const isCorrect = correctAnswer.toLowerCase() === userInput.toLowerCase();
      return isCorrect ? 10 : 0;  
    }

    const isCorrect = correctAnswer === userInput;
    return isCorrect ? 10 : 0;
  })
  .map((score, index, array) => {
    // For the last question, assign a random score between 1 and 10
    if (index === array.length - 1) {
      return Math.floor(Math.random() * 10) + 1;
    }
    return score;
  })
  .reduce((totalScore, currentScore) => totalScore + currentScore, 0); 
}

function Result() {
  const dispatch = useDispatch();
  const {
    questions: { quest, answers },
    result: { result, userId },
  } = useSelector((state) => state);



  const totalPoints = quest.length * 10;
  const earnPoints = earnPointsFn(result, answers);

  // user result
  userResults({ result, username: userId, points: earnPoints });


  const submitHandler = () => {
    dispatch(resetAction());
    dispatch(resetResultAction());
  };
  return (
    <div className="container">
      <h1 className="title text-light">Quize Time !</h1>

      <div className="result flex-center">
        <div className="flex">
          <span>{userId}</span>
          <span className="bold">
            Your Score : {earnPoints} {"/"} {totalPoints}
          </span>
        </div>
      </div>

      <div className="start">
        <Link to="/" onClick={submitHandler} className="btn">
          Restart
        </Link>
      </div>
    </div>
  );
}

export default Result;
