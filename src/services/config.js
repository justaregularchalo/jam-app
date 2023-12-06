import axios from "axios"


const service = axios.create ({

 baseURL: import.meta.env.VITE_SERVER_URL


})

// enviar el token en todas las llamadas

service.interceptors.request.use((req)=>{


    const token = localStorage.getItem("authToken")

    // si el token existe añadelo a la llamada
    if(token) {

        req.headers.authorization = `Bearer ${token}`


    }
    return req

})


export default service