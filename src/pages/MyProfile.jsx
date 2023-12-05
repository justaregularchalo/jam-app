import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import service from "../services/config";
import axios from "axios";

function MyProfile() {
  const { loggedUser } = useContext(AuthContext);

  // console.log(loggedUser)
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [isLoading, setIsloading] = useState(true);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [instrument, setInsrument] = useState("");
  const [genre, setGenre] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [picProfile, setPicProfile] = useState("");
  const [vidProfile, setVidProfile] = useState("");

  // messagios de error
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleInstrumentChange = (e) => setInsrument(e.target.value);
  const handleGenreChange = (e) => setGenre(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleBioChange = (e) => setBio(e.target.value);
  const handlePicProfileChange = (e) => setPicProfile(e.target.value);
  const handleVidProfileChange = (e) => setVidProfile(e.target.value);
  
  

  const handleSignup = async (e) => {
    e.preventDefault();


    // contactamos al backend, muñeco
    try {
      const editUser = {
        instrument,
        genre,
        username,
        location,
        bio,
        picProfile,
        vidProfile,
      };

      // await axios.post("http://localhost:5005/api/auth/signup", newUser)
      await service.put(`/profile/${loggedUser._id}`, editUser); //esta sería la ruta post
      getMyProfile();
      navigate("/my-profile");
    } catch (error) {
      console.log(error);

      // revisamos que error.response exista
      if (error.response && error.response.status === 400) {
        console.log(error.response.status);
        console.log(error.response.data.errorMessage);
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error"); // 500
      }
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  const getMyProfile = async () => {
    try {
      const response = await service.get("/my-profile");
      setUsername(response.data.username);
      setEmail(response.data.email);
      setInsrument(response.data.instrument);
      setGenre(response.data.genre);
      setLocation(response.data.location);
      setBio(response.data.bio);
      setPicProfile(response.data.picProfile);
      setVidProfile(response.data.vidProfile);
      setIsloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }
    setIsUploading(true); // to start the loading animation
    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0]);
    //                   |
    //     this name needs to match the name used in the middleware in the backend => uploader.single("image")
    try {
      const response = await service.post(
        "/edited-image",
        uploadData
      );
      // !IMPORTANT: Adapt the request structure to the one in your proyect (services, .env, auth, etc...)
      setImageUrl(response.data.imageUrl);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });
      setIsUploading(false); // to stop the loading animation
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newItem = {
      name: name,
      image: imageUrl
    }

    try {
      await axios.post("http://localhost:5005/api/my-profile", newItem)

      navigate("/my-profile/:userId")
    } catch(err){
      navigate("/error")
    }
  }

  if (isLoading) {
    return <h3>...lodeando</h3>;
  }

  return (
    <div>
          <form onSubmit={handleSubmit}>
            <label>Image: </label>
            <input
              type="file"
              name="image"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </form>
      <form className="edit-form" onSubmit={handleSignup}>
        <div className="info-container">
          <label>
            <strong>username</strong>
          </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <br />
          <label>
            <strong>instrument</strong>
          </label>
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
          <label>
            <strong>music genre</strong>
          </label>
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
          <label>
            <strong>bio</strong>
          </label>
          <input
            type="text"
            name="bio"
            value={bio}
            onChange={handleBioChange}
          />
          <br />
          <label>
            <strong>location</strong>
          </label>
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
          <label>
            <strong>Video Link</strong>
          </label>

          <input type="url" />
        </div>

        <button type="submit">
          {" "}
          <strong>Edit Profile</strong>
        </button>

        <p style={{ color: "purple" }}>{errorMessage}</p>
      </form>
    </div>
  );
}

export default MyProfile;
