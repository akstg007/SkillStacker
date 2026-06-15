import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import axios from "axios";
import { useEffect } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const fullText =
  "Personalized roadmaps, curated resources, AI mentorship, and career-focused guidance designed for developers.";

const [typedText, setTypedText] =
  useState("");
  useEffect(() => {

  let index = 0;

  const interval = setInterval(() => {

    setTypedText(
      fullText.slice(0, index)
    );

    index++;

    if (
      index > fullText.length
    ) {
      clearInterval(interval);
    }

  }, 25);

  return () =>
    clearInterval(interval);

}, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await axios.post(

  "http://localhost:5000/api/auth/signup",

  {
    name:
      formData.firstName +
      " " +
      formData.lastName,

    email:
      formData.email,

    password:
      formData.password
  }
);
      console.log(response.data);
      // TEMP: frontend-only signup mock
      localStorage.setItem(
        "skillstacker_user",
      JSON.stringify(formData)
    );

      alert("Sign up successful!");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error signing up. Please try again.");
    }

    // redirect to onboarding (important)
    navigate("/onboarding");
  };

  return (

  <div className="signup-container">

    {/* LEFT SIDE */}

    <div className="signup-left">

      <div className="logo">
        SkillStacker
      </div>

      <div className="signup-card">

        <h2>Create Account</h2>

        <p className="signup-subtitle">
          Start building your tech career
          with AI-powered guidance.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <input
            type="submit"
            value="Create Account"
          />

          <p className="signin-text">

            Already have an account?

            <Link to="/login">
              Sign in
            </Link>

          </p>

        </form>

      </div>

    </div>

    {/* RIGHT SIDE */}

    <div className="signup-right">

      <div className="overlay"></div>

      <div className="showcase-content">

        <div className="tag">
          AI Powered Career Growth
        </div>

        <h1>
          Build Your Future
          With SkillStacker 
        </h1>

        <p className="typing-text">
        {typedText}
        <span className="cursor">|</span>
        </p>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>AI Roadmaps</h3>
            <span>
              Personalized learning paths
            </span>
          </div>

          <div className="feature-card">
            <h3>Track Progress</h3>
            <span>
              Monitor your growth journey
            </span>
          </div>

          <div className="feature-card">
            <h3>Career Focused</h3>
            <span>
              Internship & job preparation
            </span>
          </div>

          <div className="feature-card">
            <h3>Curated Resources</h3>
            <span>
              Best content in one place
            </span>
          </div>

        </div>

      </div>

    </div>

  </div>
);
};

export default Signup;
