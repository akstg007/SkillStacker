import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
// };

const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const response =
      await axios.post(

        "http://localhost:5000/api/auth/login",

        {
          email,
          password
        }
      );

    localStorage.setItem(

      "token",

      response.data.token
    );

    localStorage.setItem(

      "user",

      JSON.stringify(
        response.data.user
      )
    );

    navigate("/dashboard");

  } catch (error) {

    console.log(error);

    alert(
      "Invalid credentials"
    );
  }
};
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // TEMP: frontend-only login mock
  //   localStorage.setItem(
  //     "skillstacker_user",
  //     JSON.stringify({ email })
  //   );

  //   // redirect later
  //   alert("Logged in (mock)");
  // };

  return (
    <>
      {/* NAVBAR */}
     

      {/* LOGIN CARD */}
      <div className="login-container">
        <div className="auth-logo">
  SkillStacker
</div>
        <div className="login-card">
          <h2>Log in to SkillStacker</h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input type="submit" value="Sign in" />

            <p className="signup-text">
              Don&apos;t have an account?{" "}
              <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
