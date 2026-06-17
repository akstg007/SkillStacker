import {
  getActionProgress
} from "./progressManager";

export const generateActions = (
  roadmap
) => {

  if (!roadmap) {

    return {
      today: [],
      week: [],
      month: []
    };
  }

  const progress =
    getActionProgress();

  const phase =
    roadmap.phases[
      progress.currentPhase
    ];

  if (!phase) {

    return {

      today: [
        "🎉 Roadmap Completed"
      ],

      week: [
        "Build Portfolio",
        "Apply For Internships",
        "Mock Interviews"
      ],

      month: [
        "Job Applications",
        "Open Source Contribution",
        "Advanced Projects"
      ]
    };
  }

  const tasksPerDay = 3;

  const startIndex =
    (progress.currentDay - 1) *
    tasksPerDay;

  let todayTasks =
    phase.focus.slice(
      startIndex,
      startIndex + tasksPerDay
    );

  if (todayTasks.length === 0) {

    todayTasks =
      phase.focus.slice(
        0,
        tasksPerDay
      );
  }

  return {

    today: todayTasks,

    week:
      phase.focus.slice(
        0,
        Math.min(
          7,
          phase.focus.length
        )
      ),

    month:
      phase.focus
  };
};