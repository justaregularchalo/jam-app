import { useState } from 'react'
import './App.css'

//pages

import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"
import Error from "./pages/error/Error"
import NotFound from "./pages/error/NotFound"
import AllUsers from "./pages/AllUsers.jsx"
import UsersInYourArea from "./pages/UsersInYourArea.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import ProfileEdit from "./pages/ProfileEdit.jsx"
import MyProfile from "./pages/MyProfile.jsx"
import Messages from "./pages/Messages.jsx"


//components

import Comment from "./components/Comment.jsx"
import Navbar from "./components/Navbar.jsx"
import Profile from "./components/Profile.jsx"


import { Routes, Route } from 'react-router-dom'
import Admin from './pages/Admin.jsx'
// import IsAdmin from './components/IsAdmin.jsx'








function App() {
  // const [count, setCount] = useState(0)






  return (
    <>


    <Navbar />
       <br/>
       <br/>
     

    <Routes>

    {/* <Route path="/" element={<Home />} /> */}
    <Route path="/signup" element={<Signup />} />
    <Route path="/" element={<Login />} />
    <Route path="/artists" element={<AllUsers />} />
    <Route path="/artists-your-area" element={<UsersInYourArea />} />
    <Route path="/message/:messageId" element={<Messages />} />
    <Route path="/profile/:userId" element={<ProfilePage />} />
    <Route path="/my-profile" element={<MyProfile />} />
    <Route path="/edit-profile" element={<ProfileEdit />} />
    

  

   



    <Route path="/error" element ={<Error />} />
    <Route path="*" element ={<NotFound />} />

           

    </Routes>



    </>
  )
}

export default App
