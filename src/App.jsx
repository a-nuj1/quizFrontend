import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Quize from './components/screens/Quize'
import Result from './components/screens/Result'
import Home from './components/screens/Home'


import { CheckUser } from "./components/screens/Home.jsx"


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/quize' element={<CheckUser>
          <Quize />
        </CheckUser>} />
        <Route path="/result" element={<CheckUser>
          <Result />
        </CheckUser>} />
      </Routes>
    </Router>
  )
}

export default App
