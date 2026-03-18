import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import SignUp from './Pages/SignUp.jsx'
import SignIn from './Pages/SignIn.jsx'
import { Shorts } from './Pages/Shorts/Shorts.jsx'
import { useNavigate } from "react-router-dom";
import useGetCurrentUser from './customHooks/getCurrentUser.jsx'

function App() {
  const navigate = useNavigate()
  const [count, setCount] = useState(0)
  useGetCurrentUser()

  return (
    <>
      <Routes>
        <Route path="/" element={<Home navigate={navigate} />}>
          <Route path="/shorts" element={<Shorts />} />
        </Route>
        <Route path="/signup" element={<SignUp navigate={navigate} />} />
        <Route path="/signin" element={<SignIn navigate={navigate} />} />
      </Routes>
    </>
  )
}

export default App
