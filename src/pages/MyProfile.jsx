import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import service from "../services/config";

function MyProfile() {

      
  // console.log(loggedUser)



  const[userDetails, setUserDetails] = useState(null)
  const [isLoading, setIsloading] = useState(true)


  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [instrument, setInsrument] = useState("");
  const [genre, setGenre] = useState("");
  const [location, setLocation] = useState("");
  

  // messagios de error
  const [ errorMessage, setErrorMessage ] = useState("")

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleInstrumentChange = (e) =>setInsrument(e.target.value)
  const handleGenreChange = (e) =>setGenre(e.target.value)
  const handleLocationChange = (e) =>setLocation(e.target.value)

  const handleSignup = async (e) => {
    e.preventDefault();

    // contactamos al backend, muñeco
    try {

      const newUser = { username, email, password, instrument, genre, location }

    //   await axios.post("http://localhost:5005/api/auth/signup", newUser)
      await service.post("/auth/signup", newUser) //esta sería la ruta post
      navigate("/login")

      
    } catch (error) {
      console.log(error)
      console.log(error.response.status)
      console.log(error.response.data.errorMessage)

      // revisamos que error.response exista
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      } else {
        navigate("/error") // 500
      }
    }
  };



  useEffect(() => {
    
    
    getMyProfile();

  }, []);


  const getMyProfile = async () => {

      try {

        const response = await service.get(`/my-profile/`)
        setUsername(response.data.username)
        setEmail(response.data.email)
        setInsrument(response.data.instrument)
        setGenre(response.data.genre)
        setLocation(response.data.location)
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
      

      <form className="upload-picture" >

    <img src="" alt="profile-pic" />


      </form>

      <form className= "edit-form" onSubmit={handleSignup}>
        
        <div className="info-container">




        <label><strong>username</strong></label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <br />



        <label><strong>email</strong></label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

      

        <label><strong>instrument</strong></label>
        <select
            type="instrument"
            name="instrument"
            value={instrument}
            onChange={handleInstrumentChange}
        >
        <option value="default"></option>
        <option value="Voice">Voice</option>
        <option value="Guitar">Guitar</option>
        <option value="Bass">Bass</option>
        <option value="Drums">Drums</option>
        <option value="Keyboard">Keyboard</option>
        <option value="Saxo">Saxo</option>
        <option value="Violin">Violin</option>
        <option value="Percussion">Percussion</option>
  
        </select>       

        <br />

        <label><strong>music genre</strong></label>
        <select
            type="genre"
            name="genre"
            value={genre}
            onChange={handleGenreChange}
        >
  <option value="default"></option>
  <option value="Rock">Rock</option>
  <option value="Punk">Punk</option>
  <option value="Pop">Pop</option>
  <option value="Funk">Funk</option>
  <option value="Jazz">Hip-Hop</option>
  <option value="Indie">Indie</option>
 <option value="Flamenco">Flamenco</option>
  
</select>

        <br />



        <label><strong>location</strong></label>
        <select
            type="location"
            name="location"
            value={location}
            onChange={handleLocationChange}
        >
  <option value="default"></option>
  <option value="A Coruña">A Coruña</option>
  <option value="Barcelona">Barcelona</option>
  <option value="Bilbao">Bilbao</option>
  <option value="Gran Canaria">Gran Canaria</option>
  <option value="Madrid">Madrid</option>
 <option value="Málaga">Málaga</option>
 <option value="Mallorca">Mallorca</option>
  <option value="Murcia">Murcia</option>
  <option value="Santander">Santander</option>
  <option value="Sevilla">Sevilla</option>
  <option value="Teruel">Teruel</option>
  <option value="Valencia">Valencia</option>
  <option value="Zaragoza">Zaragoza</option>
  
</select>
        </div>

        <div className="video-container">


        <label><strong>Video Link</strong></label>

        <input type="url" />

        </div>

        <button type="submit"> <strong>Edit Profile</strong></button>

        <p style={{color: "purple"}}>{errorMessage}</p>

      </form>



    
    </div>
  );
}

export default MyProfile;

