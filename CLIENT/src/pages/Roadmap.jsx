import { useEffect, useState } from "react";

import { roadmaps } from "../data/roadmaps";

import { collegeResources } from "../data/collegeResources";

import { nextActions } from "../data/nextActions";

import { seniorAdvice } from "../data/seniorAdvice";

import { getRealityStatus } from "../utils/realityCheck";

import { generateRoadmap } from "../services/roadmapAI";

import Navbar from "../components/common/Navbar";

import "./Roadmap.css";

const Roadmap = () => {

  const [aiRoadmap, setAiRoadmap] = useState("");

  const [loading, setLoading] = useState(false);

  const [completedPhases, setCompletedPhases] = useState([]);

  const [skill, setSkill] = useState(null);

  const [roadmap, setRoadmap] = useState(null);

  const [resources, setResources] = useState(null);

  const [actions, setActions] = useState(null);

  const [realityStatus, setRealityStatus] =
    useState("stretch");

  // TOGGLE PHASE

  const togglePhase = (index) => {

    let updated;

    if (
      completedPhases.includes(index)
    ) {

      updated =
        completedPhases.filter(
          (i) => i !== index
        );

    } else {

      updated = [
        ...completedPhases,
        index
      ];
    }

    setCompletedPhases(updated);

    localStorage.setItem(

      "skillstacker_progress",

      JSON.stringify(updated)
    );
  };

  // GENERATE AI ROADMAP

  const handleGenerateRoadmap =
    async () => {

      setLoading(true);

      try {

        const onboardingData =
          JSON.parse(

            localStorage.getItem(
              "skillstacker_onboarding"
            )
          );

        const roadmap =
          await generateRoadmap(
            onboardingData
          );

        setAiRoadmap(roadmap);

      } catch (error) {

        console.error(error);

        setAiRoadmap(
          "Failed to generate roadmap."
        );
      }

      setLoading(false);
    };

  // COPY AI ROADMAP

  const handleCopyAi =
    async () => {

      if (!aiRoadmap) return;

      try {

        await navigator.clipboard.writeText(
          aiRoadmap
        );

        alert(
          "AI roadmap copied successfully"
        );

      } catch (error) {

        console.error(error);
      }
    };

  // CLEAR AI ROADMAP

  const handleClearAi = () => {

    setAiRoadmap("");
  };

  // LOAD DATA

  useEffect(() => {

    const onboardingData =
      JSON.parse(

        localStorage.getItem(
          "skillstacker_onboarding"
        )
      );

    if (!onboardingData) return;

    const status =
      getRealityStatus(
        onboardingData
      );

    setRealityStatus(status);

    const selectedSkill =
      onboardingData.interest;

    setSkill(selectedSkill);

    setRoadmap(
      roadmaps[selectedSkill]
    );

    setResources(
      collegeResources[selectedSkill]
    );

    setActions(
      nextActions[selectedSkill]
    );

    const savedProgress =
      JSON.parse(

        localStorage.getItem(
          "skillstacker_progress"
        )
      );

    if (savedProgress) {

      setCompletedPhases(
        savedProgress
      );
    }

  }, []);

  // EMPTY STATE

  if (!skill) {

    return (

      <div className="generate-wrapper">

        <div className="roadmap-container">

          <h2>
            Complete onboarding
            to generate your roadmap 🚀
          </h2>

        </div>

      </div>
    );
  }

  return (

    <>

      <Navbar />

      <div className="generate-wrapper">

        <div className="roadmap-container">

          {/* HERO */}

          <div className="roadmap-hero">

            <div className="hero-badge">

              AI Powered Learning Path

            </div>

            <h1>

              {skill} Roadmap

            </h1>

            <h2 className="skill-title">

              Become industry ready
              with a structured
              progression system.

            </h2>

          </div>

          {/* SUMMARY */}

          <div className="summary">

            <h3>
              Your Focus Plan
            </h3>

            <p>

              Based on your current
              level, focus on mastering
              the fundamentals,
              building projects,
              and staying consistent
              with practical learning.

            </p>

            <p className="timeline">

              🎯 Estimated job-ready
              timeline:

              <strong>
                {" "}3–5 Months
              </strong>

            </p>

          </div>

          {/* AI BUTTON */}

          <div className="ai-roadmap-section">

            <button

              className="generate-ai-btn"

              onClick={
                handleGenerateRoadmap
              }

              disabled={loading}
            >

              {loading ? (

                <>

                  <span className="spinner"></span>

                  Generating...

                </>

              ) : (

                <>
                  🤖 Generate AI Roadmap
                </>

              )}

            </button>

          </div>

          {/* PROGRESS */}

          {roadmap && (

            <div className="progress-bar-wrapper">

              <div className="progress-header">

                <span>
                  Roadmap Progress
                </span>

                <span>

                  {Math.round(

                    (

                      completedPhases.length /

                      roadmap.phases.length

                    ) * 100

                  ) || 0}

                  %

                </span>

              </div>

              <div className="progress-track">

                <div

                  className="progress-fill"

                  style={{

                    width: `${

                      Math.round(

                        (

                          completedPhases.length /

                          roadmap.phases.length

                        ) * 100

                      ) || 0

                    }%`
                  }}
                ></div>

              </div>

            </div>
          )}

          {/* ROADMAP */}

          {roadmap && (

            <div className="section">

              <h3>
                Learning Journey
              </h3>

              <p className="description">

                Follow this structured
                progression roadmap
                to maximize consistency
                and skill growth.

              </p>

              {roadmap.phases.map(

                (phase, index) => (

                  <div

                    key={index}

                    className={`roadmap-card ${

                      completedPhases.includes(index)

                        ? "completed"

                        : ""

                    }`}
                  >

                    <div className="phase-header">

                      <h4>
                        {phase.title}
                      </h4>

                      <input

                        type="checkbox"

                        checked={

                          completedPhases.includes(index)
                        }

                        onChange={() =>
                          togglePhase(index)
                        }
                      />

                    </div>

                    <p className="duration">

                      {phase.duration}

                    </p>

                    <div className="focus">

                      <strong>
                        Focus On
                      </strong>

                      <ul>

                        {phase.focus.map(

                          (item, i) => (

                            <li key={i}>
                              {item}
                            </li>
                          )
                        )}

                      </ul>

                    </div>

                    <div className="skip">

                      <strong>
                        Avoid
                      </strong>

                      <ul>

                        {phase.skip.map(

                          (item, i) => (

                            <li key={i}>
                              {item}
                            </li>
                          )
                        )}

                      </ul>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

          {/* LOADING */}

          {loading && (

            <div className="roadmap-loading-card">

              <div className="loading-ai">

                <div className="loader"></div>

                Generating AI Roadmap...

              </div>

            </div>
          )}

          {/* AI ROADMAP */}

          {aiRoadmap && (

            <div className="ai-main-card">

              <div className="ai-toolbar">

                <button

                  className="ai-action-btn"

                  onClick={handleCopyAi}
                >

                  Copy

                </button>

                <button

                  className="ai-action-btn"

                  onClick={handleClearAi}
                >

                  Clear

                </button>

              </div>

              <h3>

                🤖 AI Generated Roadmap

              </h3>

              <div className="ai-roadmap-output">

                {aiRoadmap

                  .split("\n\n")

                  .map(

                    (section, index) => (

                      <div

                        key={index}

                        className="ai-section-card"
                      >

                        {section

                          .split("\n")

                          .map(

                            (line, i) => {

                              if (

                                line.includes("Phase") ||

                                line.includes("Weekly Plan") ||

                                line.includes("Motivation")

                              ) {

                                return (

                                  <h2

                                    key={i}

                                    className="ai-main-heading"
                                  >

                                    {line}

                                  </h2>
                                );
                              }

                              if (

                                line.includes("Duration") ||

                                line.includes("Focus") ||

                                line.includes("Projects") ||

                                line.includes("Avoid")

                              ) {

                                return (

                                  <div

                                    key={i}

                                    className="ai-point"
                                  >

                                    {line}

                                  </div>
                                );
                              }

                              return (

                                <p

                                  key={i}

                                  className="ai-text"
                                >

                                  {line}

                                </p>
                              );
                            }
                          )}

                      </div>
                    )
                  )}

              </div>

            </div>
          )}

        </div>

      </div>

    </>
  );
};

export default Roadmap;