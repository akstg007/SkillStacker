import axios from "axios";

const API_KEY =
  import.meta.env.VITE_GROQ_API_KEY;

console.log(API_KEY);

export const generateRoadmap = async (
  onboardingData
) => {

 const prompt = `
You are an expert software engineer mentor.

Create a clean personalized roadmap.

PROFILE:
${onboardingData.profile}

GOAL:
${onboardingData.goal}

CURRENT LEVEL:
${onboardingData.level}

INTEREST:
${onboardingData.interest}

FORMAT STRICTLY LIKE THIS:

Phase 1:
- Duration:
- Focus:
- Projects:
- Avoid:

Phase 2:
- Duration:
- Focus:
- Projects:
- Avoid:

Weekly Plan:
- Monday:
- Tuesday:
- Wednesday:

Motivation:
- realistic advice

Keep response concise and visually structured.
`;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",

    {
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "user",
          content: prompt
        }
      ],

      temperature: 0.7
    },

    {
      headers: {
        "Content-Type": "application/json",

        Authorization:
          `Bearer ${API_KEY}`
      }
    }
  );

  return response.data.choices[0]
    .message.content;
};