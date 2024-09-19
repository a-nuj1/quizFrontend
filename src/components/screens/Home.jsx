import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom'
import { setUserId } from '../../redux/resultReducer';
import axios from 'axios'




function Home() {

  const inputRef = useRef(null);

  const dispatch = useDispatch()
  const startQuiz = () => {
    if(inputRef.current?.value){
      dispatch(setUserId(inputRef.current?.value))
    }
  }

  return (
    <div className='container'>
      <h1 className='title text-light'>Quize Time !</h1>


      <form id='form'>
        <input type='text' ref={inputRef} placeholder='Name*' className='userid' />
      </form>

      <div className='start'>
        <Link className='btn' to={'quize'} onClick={startQuiz}>Start Quiz</Link>
      </div>
    </div>
  )
}

export default Home





// function to check auth status


export function CheckUser({children}) {
  const auth = useSelector(state => state.result.userId)
  return auth ? children : <Navigate to='/' replace={true}/>
}


// get server data

export async function getServerData(url,call){
  const data = await(await axios.get(url))?.data;
  return call ? call(data): data;
  // const data = await axios.get(url);
  // console.log(data);

}

// post server data

export async function postServerData(url,result, call){
  const data = await(await axios.post(url, result))?.data;
  return call ? call(data): data;
}




// getServerData('http://localhost:8000/api/result')
