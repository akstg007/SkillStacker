import { useState } from "react";
import { seniorAdvice } from "../data/seniorAdvice";
import Navbar from "../components/common/Navbar";
import "./SeniorAdvice.css";

const SeniorAdvice = () => {

  const [name, setName] = useState("");
  const [advice, setAdvice] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    alert(
      "Advice submitted! (Frontend Demo Only)"
    );

    setName("");
    setAdvice("");
  };

  return (

    <>
      <Navbar />

      <div className="advice-page">

        {/* HERO */}

        <div className="advice-hero">

          <div className="hero-badge">

            Learn From Experience

          </div>

          <h1>

            Senior Advice 💡

          </h1>

          <h2>

            Real guidance from students,
            interns and developers who have
            already walked the path.

          </h2>

        </div>

        {/* COMING SOON */}

        <div className="coming-soon-banner">

          <div className="coming-badge">

            Coming Soon

          </div>

          <h2>

            Skill Exchange Platform 🚀

          </h2>

          <p>

            Connect with learners, mentors
            and project partners. Exchange
            skills, collaborate on projects,
            get feedback and grow together.

          </p>

          <button
            className="notify-btn"
          >

            🔔 Notify Me

          </button>

        </div>

        {/* ADVICE FEED */}

        <div className="advice-feed">

          {seniorAdvice.map((item) => (

            <div
              className="advice-card"
              key={item.id}
            >

              <div className="advice-top">

                <h3>
                  {item.name}
                </h3>

                <span>
                  {item.skill}
                </span>

              </div>

              <p>
                "{item.advice}"
              </p>

            </div>

          ))}

        </div>

        {/* SUBMIT */}

        <div className="submit-section">

          <h2>

            Share Your Advice

          </h2>

          <p>

            Help juniors avoid mistakes and
            move faster in their journey.

          </p>

          <form
            onSubmit={handleSubmit}
          >

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />

            <textarea
              placeholder="Write your advice..."
              value={advice}
              onChange={(e) =>
                setAdvice(
                  e.target.value
                )
              }
            />

            <button
              type="submit"
            >

              Submit Advice

            </button>

          </form>

        </div>

      </div>
    </>
  );
};

export default SeniorAdvice;