import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import service from "../services/config";
import { NavLink } from "react-router-dom";


function ProfilePage() {

  const params =useParams()
  console.log(params)

  const[userDetails, setUserDetails] = useState(null)
  const [isLoading, setIsloading] = useState(true)



  useEffect(()=> {

    getUsers()


  },[params.userId])

  const getUsers = async () => {

    console.log(params.userId)

    try{

      const response = await service.get(`/profile/${params.userId}`)

     

      setUserDetails(response.data)
      setIsloading(false)

    }catch(error){

      console.log(error)

    }

  }

  if (isLoading) {
    return <h3>...lodeando</h3>;
  }



  return (
    <div>

      <h1>{userDetails.username}</h1> 
        

       <img src="" alt={userDetails.username} />

      <p> <strong>Instrument:  </strong> {userDetails.instrument}</p>

      <p> <strong>Genre:  </strong> {userDetails.genre}</p>

      <p> <strong>Location:  </strong> {userDetails.location}</p>

      <p> <strong>Info:  </strong> {userDetails.bio}</p>

      <div className="video-container">


    <img src="" alt="" />



      </div>
      
      <button>
            <NavLink to={"/artists"}>See all artists</NavLink>
          </button>








    </div>
  )
}

export default ProfilePage