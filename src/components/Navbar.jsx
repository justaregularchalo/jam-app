import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
 
function Navbar() {

  const navigate = useNavigate()

  const { isLoggedIn, authenticateUser } = useContext(AuthContext)

  

  const handleLogout = () => {
    // borramos el token
    localStorage.removeItem("authToken")

    // actualizamos el estado del user con el context de auth
    authenticateUser()

    // redireccinamos al login con navigate
    navigate("/signup")
  }

  const toggleStyles = (navInfo) => {
    return navInfo.isActive === true ? activeStyles : inActiveStyles;
  };

  const activeStyles = {
    textDecoration: "underline",
  };

  const inActiveStyles = {
    textDecoration: "none",
  };

  if (isLoggedIn) {
    return (
      <nav>
        <NavLink to="/" style={toggleStyles}>Home</NavLink>|
        <NavLink to="/all-users" style={toggleStyles}>All Users</NavLink>|
        <NavLink to="/all-genres" style={toggleStyles}>All Genres</NavLink>|
        <NavLink to="/user-profile" style={toggleStyles}>My Profile</NavLink>|

        {/* <NavLink to="/admin" style={toggleStyles}>Admin</NavLink>| */}
        <p onClick={handleLogout}>Log Out</p>
      </nav>
    );
  } else {
    return (
      <nav>
       
       
        {/* <NavLink to="/login" style={toggleStyles}>Log In</NavLink> */}
      </nav>
  );
  }

  
}

export default Navbar