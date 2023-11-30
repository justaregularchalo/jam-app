import { useState } from 'react'
import './App.css'

//pages
import Home from "./pages/Home"
import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"
import Error from "./pages/error/Error"
import NotFound from "./pages/error/NotFound"
import AllUSers from "./pages/AllUsers.jsx"
import AllGenres from "./pages/AllGenres.jsx"
import UserDetails from "./pages/UserDetails.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import ProfileEdit from "./pages/ProfileEdit.jsx"
import Messages from "./pages/Messages.jsx"


//components

import Comment from "./components/Comment.jsx"
import Navbar from "./components/Navbar.jsx"
import Profile from "./components/Profile.jsx"


import { Routes, Route } from 'react-router-dom'








function App() {
  // const [count, setCount] = useState(0)






  return (
    <>


    <Navbar />
       <br/>
       <br/>
     

    <Routes>

    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/all-users" element={<AllUSers />} />
    <Route path="/all-genres" element={<AllGenres />} />
    <Route path="/message/:messageId" element={<Messages />} />
    <Route path="/user-profile" element={<ProfilePage />} />
    <Route path="/edit-profile" element={<ProfileEdit />} />
    <Route path="/user-details/:userId" element={<UserDetails />} />




    <Route path="/error" element ={<Error />} />
    <Route path="*" element ={<NotFound />} />



    </Routes>



    </>
  )
}

export default App
