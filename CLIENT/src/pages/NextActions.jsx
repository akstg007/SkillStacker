import "./nextActions.css";

import { useEffect, useState } from "react";

import { roadmaps } from "../data/roadmaps";
import { generateActions } from "../utils/generateActions";

import {
  getActionProgress,
  saveActionProgress
} from "../utils/progressManager";

import Navbar from "../components/common/Navbar";

const NextActions = () => {

  const [actions, setActions] = useState(null);

  const [skill, setSkill] = useState("");

  const [progress, setProgress] =
    useState(null);

  const [completedTasks, setCompletedTasks] =
    useState([]);

  useEffect(() => {

    const onboardingData =
      JSON.parse(
        localStorage.getItem(
          "skillstacker_onboarding"
        )
      );

    if (!onboardingData) return;

    const selectedSkill =
      onboardingData.interest;

    const roadmap =
      roadmaps[selectedSkill];

    const generatedActions =
      generateActions(
        roadmap
      );

    const savedProgress =
      getActionProgress();

    setProgress(
      savedProgress
    );

    setCompletedTasks(
      savedProgress.completedTasks || []
    );

    setSkill(
      selectedSkill
    );

    setActions(
      generatedActions
    );

  }, []);

  const toggleTask = (task) => {

    let updated;

    if (
      completedTasks.includes(task)
    ) {

      updated =
        completedTasks.filter(
          t => t !== task
        );

    } else {

      updated = [
        ...completedTasks,
        task
      ];
    }

    setCompletedTasks(
      updated
    );

    const current =
      getActionProgress();

    current.completedTasks =
      updated;

    saveActionProgress(
      current
    );

    const allDone =
      actions.today.every(
        t => updated.includes(t)
      );

   if (allDone) {

  current.currentDay += 1;

  current.currentWeek =
    Math.ceil(
      current.currentDay / 7
    );

  current.currentMonth =
    Math.ceil(
      current.currentDay / 30
    );

  current.completedTasks = [];

  saveActionProgress(
    current
  );

  setCompletedTasks([]);

  const generated =
    generateActions(
      roadmaps[skill]
    );

  setActions(
    generated
  );

  setProgress(
    { ...current }
  );
}
  };

  if (!actions) {

    return (
      <>
        <Navbar />

        <div className="actions-page">

          <div className="empty-state">

            <h2>
              Complete onboarding first 🚀
            </h2>

            <p>
              Your personalized action plan
              will appear here.
            </p>

          </div>

        </div>
      </>
    );
  }

  return (

    <>
      <Navbar />

      <div className="actions-page">

        <div className="actions-hero">

          <div className="hero-badge">

            Daily Growth System

          </div>

          <h1>

            Next Actions

          </h1>

          <h2>

            Personalized execution plan
            for {skill}

          </h2>

        </div>

        <div className="overview-card">

          <div className="overview-item">

            <h3>
              Current Day
            </h3>

            <span>
              {progress?.currentDay || 1}
            </span>

          </div>

          <div className="overview-item">

            <h3>
              Current Week
            </h3>

            <span>
              {progress?.currentWeek || 1}
            </span>

          </div>

          <div className="overview-item">

            <h3>
              Tasks Today
            </h3>

            <span>
              {actions.today.length}
            </span>

          </div>

        </div>

        {/* TODAY */}

        <div className="action-section">

          <div className="section-heading">

            <span>⚡</span>

            <h2>
              Today's Mission
            </h2>

          </div>

          <div className="action-grid">

            {actions.today.map(

              (task, index) => (

                <div
  key={index}
  className={`action-card today-card ${
    completedTasks.includes(task)
      ? "task-done"
      : ""
  }`}
>

                  <div className="action-number">

                    {String(index + 1)
                      .padStart(2, "0")}

                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center"
                    }}
                  >

                    <input
                      type="checkbox"
                      checked={
                        completedTasks.includes(
                          task
                        )
                      }
                      onChange={() =>
                        toggleTask(task)
                      }
                    />

                   <p
  className={
    completedTasks.includes(task)
      ? "completed-task"
      : ""
  }
>
  {task}
</p>

                  </div>

                </div>
              )
            )}

          </div>

        </div>

        {/* WEEK */}

        <div className="action-section">

          <div className="section-heading">

            <span>🔥</span>

            <h2>
              This Week
            </h2>

          </div>

          <div className="action-grid">

            {actions.week.map(

              (task, index) => (

                <div
                  key={index}
                  className="action-card week-card"
                >

                  <div className="action-number">

                    {String(index + 1)
                      .padStart(2, "0")}

                  </div>

                  <p>
                    {task}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

        {/* MONTH */}

        <div className="action-section">

          <div className="section-heading">

            <span>🎯</span>

            <h2>
              This Month
            </h2>

          </div>

          <div className="action-grid">

            {actions.month.map(

              (task, index) => (

                <div
                  key={index}
                  className="action-card month-card"
                >

                  <div className="action-number">

                    {String(index + 1)
                      .padStart(2, "0")}

                  </div>

                  <p>
                    {task}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </>
  );
};

export default NextActions;