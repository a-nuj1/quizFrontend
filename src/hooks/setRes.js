import * as Action from '../redux/resultReducer.js'


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