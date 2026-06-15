import Navbar from "../components/common/Navbar";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Carousel from "../components/dashboard/carousel";

import "./Dashboard.css";

const Dashboard = () => {

  const [userData, setUserData] =
    useState(null);

  const navigate = useNavigate();

  const roleMap = {

    "Web Development":
      "Web Developer",

    "Data Science":
      "Data Scientist",

    "Mobile Apps":
      "Mobile App Developer",

    "Competitive Programming":
      "Problem Solver",

    "System Design":
      "System Architect",
  };

  useEffect(() => {

    const data = JSON.parse(

      localStorage.getItem(
        "skillstacker_onboarding"
      )
    );

    if (data) {

      setUserData(data);
    }

  }, []);

  return (

    <>

      <Navbar />

      <div className="dashboard-container">

        {/* HERO SECTION */}

        <div className="hero-section">

          <div className="hero-badge">
            Powered Dashboard
          </div>

          <h1 className="dashboard-title">

            Welcome Future{" "}

            <span>

              {roleMap[
                userData?.interest
              ] || "Learner"}

            </span>

            

          </h1>

          <p className="dashboard-subtitle">

            Your personalized AI learning
            workspace designed to help
            you become industry ready
            faster.

          </p>

        </div>

        {/* STATS */}

        {userData && (

          <div className="dashboard-stats">

            <div className="stat-card">

              <h3>Skill</h3>

              <p>
                {userData.interest}
              </p>

            </div>

            <div className="stat-card">

              <h3>Goal</h3>

              <p>
                {userData.goal}
              </p>

            </div>

            <div className="stat-card">

              <h3>Level</h3>

              <p>
                {userData.level}
              </p>

            </div>

          </div>
        )}

        {/* CAROUSEL */}

        <Carousel />

        {/* QUICK ACTIONS */}

        <div className="quick-actions">

          <div
            className="action-card"

            onClick={() =>
              navigate("/roadmap")
            }
          >

            <h3>AI Roadmap</h3>

            <p>
              Continue your guided
              learning journey with
              personalized milestones.
            </p>

          </div>

          <div
            className="action-card"

            onClick={() =>
              navigate("/resources")
            }
          >

            <h3>Resources</h3>

            <p>
              Access curated videos,
              docs, and learning
              materials selected for
              your goals.
            </p>

          </div>

          <div
            className="action-card"

            onClick={() =>
              navigate("/next-actions")
            }
          >

            <h3>Next Actions</h3>

            <p>
              Know exactly what to do
              next to stay consistent
              and improve faster.
            </p>

          </div>

        </div>

        {/* CTA */}

        <div className="continue-section">

          <button
            className="continue-btn"

            onClick={() =>
              navigate("/roadmap")
            }
          >

            Continue Learning →

          </button>

        </div>

      </div>

    </>
  );
};

export default Dashboard;