
import { createContext, useState, useEffect } from "react";
import service from "../services/config";




//componente que transmite contexto(estados y demore)
const AuthContext = createContext()



//componente envoltorio donde se envuelve el contexto

function AuthWrapper(props) {

        //estados a compartir por el context

        const [isLoggedIn, setIsLoggedIn] = useState (false)
        const [isLoading, setIsLoading] = useState(true)
        // const [isAdmin, setIsAdmin] = useState (false)

       const authenticateUser = async() => {

    // esta función va a enviar a el tocken al BE para la validaçao
        // usaremos la ruta BE "/verify
        // si el token funciona, isLoggedIn=true
        // sino existe o o es válido, is LoggedIn =falsete


       


        try {

            const response = await service.get("/auth/verify")
            //token válido, manué

            console.log(response)
            setIsLoggedIn(true)
            setIsLoading(false)
            // setIsAdmin(true)


        }catch(error){
            // token no es válido o no existe
            console.log(error)
            setIsLoggedIn(false)
            setIsLoading(false)

        }



}

    // al iniciar sección se valida el token 
        useEffect (()=>{

            authenticateUser()

        }, [])


        const passedContext = {
            authenticateUser
        
        
        }

        if(isLoading){

        return <h3>...validating credentials</h3>

        }


        return (


            <AuthContext.Provider value={passedContext}>

            {/* esta será toda nuestra app */}
            {props.children} 

            </AuthContext.Provider>




        )


}

export {

    AuthContext,
    AuthWrapper
}