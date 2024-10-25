import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const jwtToken = sessionStorage.getItem("access_token");

  if(jwtToken)
  {
    const token = jwtDecode(jwtToken);
    
    if (token.exp * 1000 < new Date().getTime()) {
      sessionStorage.clear();
    }
  }

  const name = sessionStorage.getItem("user_name");

  return (
    <nav className="navbar">
      <h1>The Best Event Planning App</h1>
      <div className="links">
        <Link to="/">Home</Link>
        {
          name &&
          <Link to="/create" className="create-button">New Event</Link>
        }
        <Link to="/login/">{name ? name : "Log In"}</Link>
        <Link to="/register/">Register</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;