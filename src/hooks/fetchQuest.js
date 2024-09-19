import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Action from "./../redux/questionReducer"
// import { getServerData } from "../components/screens/Home";
import data,{answers}from "../components/database/data.js"

export const useFetchQuest = () => {

    const dispatch = useDispatch();

    const [getData, setGetData] = useState({
      loading: false,
      apiData: [],
      serverError: null,
    });
  
    useEffect(() => {
      setGetData((prev) => ({ ...prev, loading: true }));

      // const serverUrl = process.env.REACT_APP_SERVER_URL;

      // Fetching data from backend
      (async () => {
        try {
          // const data = await getServerData(`${serverUrl}/api/question`, (data) => data);
          // const { questions, answers } = data;

          let questions = await data;
  
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