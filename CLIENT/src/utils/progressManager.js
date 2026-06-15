export const getActionProgress = () => {

const saved = JSON.parse(
localStorage.getItem(
"skillstacker_action_progress"
)
);

return (
saved || {
currentPhase: 0,
currentDay: 1,
currentWeek: 1,
completedTasks: []
}
);
};

export const saveActionProgress = (
data
) => {

localStorage.setItem(
"skillstacker_action_progress",
JSON.stringify(data)
);
};
