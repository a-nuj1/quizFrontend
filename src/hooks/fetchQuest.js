import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Action from "./../redux/questionReducer"
import { getServerData } from "../components/screens/Home.jsx";
// import data,{answers}from "../components/database/data.js"

import {REACT_APP_SERVER_HOSTNAME}from "../../src/constant.js"
export const useFetchQuest = () => {

    const dispatch = useDispatch();

    const [getData, setGetData] = useState({
      loading: false,
      apiData: [],
      serverError: null,
    });
  
    useEffect(() => {
      setGetData((prev) => ({ ...prev, loading: true }));


      // Fetching data from backend
      (async () => {
        try {
          const [{questions, answers}] = await getServerData(`${REACT_APP_SERVER_HOSTNAME}/api/question`, (data)=>data);
          // console.log({questions, answers});
  
          if (questions.length > 0) {
            setGetData((prev) => ({ ...prev, loading: false}));
            setGetData((prev) => ({ ...prev, apiData: {questions, answers} }));
            dispatch(Action.addExamAction({ question: questions, answers }));
          } else {
            throw new Error("No data found");
          }
        } catch (error) {
          setGetData((prev) => ({...prev, loading: false,}));
          setGetData((prev) => ({...prev, serverError: error}));
        }
      })();
    }, [dispatch]);
    return [getData, setGetData];
}



// next dispacth action
// use dispactch only accessible only inside hook 
// so we need to return  another function form this function  
export const moveNextQuest = ()=>async(dispatch)=>{
    try{
        dispatch(Action.moveNextAction())
    }
    catch(error){
        console.log(error)
    }
}


export const movePrevQuest = ()=>async(dispatch)=>{
    try{
        dispatch(Action.movePrevAction())
    }
    catch(error){
        console.log(error)
    }
}