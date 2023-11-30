import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRoutes } from "react-router-dom";



// import service from "../../services/config";

function Signup() {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    // contactamos al backend
    try {

      const newUser = { username, email, password, instrument, genre, location }

      await axios.post("http://localhost:5005/api/auth/signup", newUser)
    // //   await service.post("/auth/signup", newUser)
      navigate("/login")

      
    } catch (error) {
      console.log(error)
      console.log(error.response.status)
      console.log(error.response.data.errorMessage)
      // abajo primero analiza que error.response exista
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      } else {
        navigate("/error") // 500
      }
    }
  };

  return (
    <div>

      <h1>Formulario de Registro</h1>
    
      <form onSubmit={handleSignup}>
        
        <label>username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <br />

        <label>email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />


        <label>instrument</label>
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

        <label>music genre</label>
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



        <label>location</label>
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





        <button type="submit">Sign up</button>

        <p style={{color: "red"}}>{errorMessage}</p>

      </form>
      
    </div>
  );
}

export default Signup;