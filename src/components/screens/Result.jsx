import React, { useEffect, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { resetResultAction } from "../../redux/resultReducer";
import { resetAction } from "../../redux/questionReducer";

export const earnPointsFn = (result, answers) => {
  return result.map((userInput, i) => {
    const correctAnswer = answers[i].answer || answers[i]; // Either handle `answer` or directly the value
    const questionType = answers[i].type || "default"; // Assume a default type if type isn't specified

    console.log(`Question ${i + 1}: Type - ${questionType}`);
    console.log(`User Input: ${userInput}`);
    console.log(`Correct Answer: ${correctAnswer}`);

    // Handle different question types
    if (questionType === "descriptive") {
      // Random score between 5 and 10 for descriptive answers
      const descriptiveScore = Math.floor(Math.random() * 6) + 5;
      console.log(`Descriptive answer score: ${descriptiveScore}`);
      return descriptiveScore;
    }

    if (questionType === "fill-in-the-blank") {
      // Compare fill-in-the-blank answer (lowercase comparison)
      const isCorrect = correctAnswer.toLowerCase() === userInput.toLowerCase();
      console.log(`Fill-in-the-blank match: ${isCorrect}`);
      return isCorrect ? 10 : 0;  // 10 points for correct answers
    }

    // For MCQ/boolean, compare indices or answers
    const isCorrect = correctAnswer === userInput;
    console.log(`MCQ/Boolean match: ${isCorrect}`);
    return isCorrect ? 10 : 0;
  })
  .map((score, index, array) => {
    // For the last question, assign a random score between 1 and 10
    if (index === array.length - 1) {
      return Math.floor(Math.random() * 10) + 1;
    }
    return score;
  })
  .reduce((totalScore, currentScore) => totalScore + currentScore, 0); // Sum the scores
}

function Result() {
  const dispatch = useDispatch();
  const {
    questions: { quest, answers },
    result: { result, userId },
  } = useSelector((state) => state);



  const totalPoints = quest.length * 10;
  const earnPoints = earnPointsFn(result, answers);
  useEffect(() => {
    console.log(` User Id : ${userId}`);
    console.log(`Result : ${result}`);
    console.log(` Total Points : ${totalPoints}`);
    console.log(` Total Earn Points : ${earnPoints}`);
  });


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
