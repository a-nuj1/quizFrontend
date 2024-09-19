import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchQuest } from "../../hooks/fetchQuest";
import { moveNextQuest , movePrevQuest} from "../../hooks/fetchQuest";
import { pushAns } from "../../hooks/setRes"; 
import {Navigate} from "react-router-dom"
import { updateResAction } from "../../hooks/setRes";

function Quize() {

  const [checked, setChecked] = useState(undefined);

  const result = useSelector(state => state.result.result);
  const {quest, count} = useSelector(state =>state.questions);
  const dispatch = useDispatch();

  // console.log(result);

  // next btn handler
  const nextHandler = () => {
    if(count < quest.length){
      dispatch(moveNextQuest());
      
      if(result.length <= count){
        dispatch(pushAns(checked));
      }
    }

    setChecked(undefined);
  };



  const prevHandler = () => {
    if(count > 0)
      dispatch(movePrevQuest());
  };

  const onCheckedHandler = (check) => {
    setChecked(check);
  }

  


  if(result.length && result.length >= quest.length){
    return <Navigate to="/result" replace={true}/>
  }

  return (
    <div className="container">
      <h1 className="title text-light">Quize Time !</h1>

      {/* qustions will display here */}
      <Questions onCheckedHandler={onCheckedHandler}/>


      <div className="grid">
        {
          count > 0 ? <button className="btn prev" onClick={prevHandler}>
          Prev
        </button> : <div> </div>
        }
        <button className="btn next" onClick={nextHandler}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Quize;

// Question component

function Questions({onCheckedHandler}) {

  const [checked, setChecked] = useState(undefined);

  const [{ loading, apiData, serverError }] = useFetchQuest();

  // useSelector(state =>console.log(state));
  
  const questions = useSelector((state) => state.questions.quest[state.questions.count]);


  const {count} = useSelector((state) => state.questions);


  const result = useSelector((state) => state.result.result);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(updateResAction({count, checked}))
  // });



  const onChangeHandler = (answer) => {
    onCheckedHandler(answer);  
    setChecked(answer);
    
    dispatch(updateResAction({count, checked: answer})); 
  };


  if (loading) return <h3 className="text-light">isLoading</h3>;
  if (serverError) return <h3 className="text-light">{serverError || "unknown error"}</h3>;

  if (!questions) {
    return <h3 className="text-light">No question available</h3>;
  }

  const renderQuestionType = () => {
    switch (questions.type) {
      case "mcq":
        return (
          <ul key={questions.id}>
            {questions.options.map((q, i) => (
              <li key={i}>
                <input
                  type="radio"
                  name="options"
                  id={`q${i}-option`}
                  value={false}
                  onChange={()=>onChangeHandler(i)}
                />
                <label className="text-primary" htmlFor={`q${i}-option`}>
                  {q}
                </label>
                <div className={`check ${result[count] == i ? 'checked': ''}`}></div>
              </li>
            ))}
          </ul>
        );
        case "boolean":
          return (
            <ul key={questions.id}>
              {questions.options.map((q, i) => (
                <li key={i}>
                  <input
                    type="radio"
                    name="options"
                    id={`q${i}-option`}
                    value={false}
                    onChange={()=>onChangeHandler(i)}
                  />
                  <label className="text-primary" htmlFor={`q${i}-option`}>
                  {q}
                  </label>
                  <div className={`check ${result[count] == i ? 'checked': ''}`}></div>
                </li>
                ))}
            </ul>
          );
      case "fill-in-the-blank":
        return (
          <div>
            <input
              type="text"
              placeholder="Your answer here..."
              style={{
                margin: "2em 0",
                padding: ".7em 4em",
                width: "50%",
                border: "none",
                borderRadius: "1px",
                fontSize: "1em",
                textAlign: "center",
              }}
              onChange={(e)=>{
                const userInput = e.target.value.toLowerCase();
                onChangeHandler(userInput);
              }}
            />
          </div>
        );
      case "descriptive":
        return (
          <div>
            <textarea
             placeholder="Write your answer here... (50 words max)"
             style={{
              margin: "2em 0",
              padding: ".7em 5em",
              width: "50%",
              border: "none",
              borderRadius: "3px",
              fontSize: "1em",
            }}
            //TODO:  here i got problem with handler function i will resolve it later
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="questions">
      <h2 className="text-light">{questions?.question}</h2>
      {renderQuestionType()}
    </div>
  );
}
