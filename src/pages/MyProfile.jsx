import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/config";
import { AuthContext } from "../context/auth.context";
import { NavLink } from "react-router-dom";

function MyProfile() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <div>
      <h1>My Profile</h1>
    </div>
  );
}

export default MyProfile;
