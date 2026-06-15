import { Link } from "react-router-dom";

import {
  useNavigate
} from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "skillstacker_onboarding"
    );

    navigate("/login");
  };

  return (

    <nav className="navbar">

      {/* LOGO */}

      <div
        className="navbar-logo"

        onClick={() =>
          navigate("/dashboard")
        }
      >
        SkillStacker
      </div>

      {/* LINKS */}

      <div className="navbar-links">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/roadmap">
          Roadmap
        </Link>

        <Link to="/resources">
          Resources
        </Link>

        <Link to="/next-actions">
          Actions
        </Link>

        <Link to="/senior-advice">
          Advice
        </Link>

      </div>

      {/* BUTTON */}

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>

    </nav>
  );
};

export default Navbar;