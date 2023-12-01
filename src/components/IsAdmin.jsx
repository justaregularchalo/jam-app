import React, { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate } from "react-router-dom"


function IsAdmin(props) {

    const {isLoggedIn} = useContext(AuthContext)

    if(isLoggedIn){


        return props.children


    }else {

        return <Navigate to={"/all-users"} />
    }

    
}

export default IsAdmin