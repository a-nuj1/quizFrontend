import { postServerData } from '../components/screens/Home.jsx'
import * as Action from '../redux/resultReducer.js'
import {REACT_APP_SERVER_HOSTNAME} from "../../src/constant.js"

export const pushAns = (result)=> async(dispatch)=>{
    try{
        dispatch(Action.pushResultAction(result))
    }
    catch(error){
        console.log(error)
    }
}

export const updateResAction = (ind)=>async(dispatch)=>{
    try{
        dispatch(Action.updateRes(ind))
    }
    catch(error){
        console.log(error)
    }
}


// insert user data or result

export const userResults = (resultData) => {
    const { result, username, points } = resultData;
    (async () => {
      try {
        // Check for invalid data
        if (!Array.isArray(result) || result.length === 0 || !username) throw new Error('Invalid data');
        
        // Send data to the server
        await postServerData(`${REACT_APP_SERVER_HOSTNAME}/api/result`, 
        { username, results: result, points }, 
        data => data);
      } catch (error) {
        console.log(error);
      }
    })();
  }