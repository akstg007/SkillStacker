export const getRealityStatus = (onboardingData) => {
  if (!onboardingData) return "stretch";

  const level = onboardingData.level;
  const goal = onboardingData.goal;

  // Unrealistic cases
  if (
    level === "Absolute Beginner" &&
    goal === "Get an internship/job"
  ) {
    return "unrealistic";
  }

  // Stretch cases
  if (
    level === "Intermediate" &&
    goal === "Get an internship/job"
  ) {
    return "stretch";
  }

  // Realistic cases
  if (
    level === "Intermediate" ||
    level === "Advanced"
  ) {
    return "realistic";
  }

  return "stretch";
};
