import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import SignUp from './Pages/signUp.jsx'
import SignIn from './Pages/signIn.jsx'
import { Shorts } from './Pages/Shorts/Shorts.jsx'
import { useNavigate } from "react-router-dom";

function App() {
  const navigate=useNavigate()
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home navigate={navigate} />}>
          <Route path="/shorts" element={<Shorts />} />
        </Route>
        <Route path="/signup" element={<SignUp navigate={navigate}/>}/>
        <Route path="/signin" element={<SignIn navigate={navigate}/>}/>
    </Routes>
    </>
  )
}

export default App
