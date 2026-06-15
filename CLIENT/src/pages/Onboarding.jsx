import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./onboarding.css";

const questions = [
  {
    id: "profile",
    question: "Which best describes you?",
    options: ["Student", "Professional", "Freelancer", "Career Switcher", "Other"],
  },
  {
    id: "goal",
    question: "What is your main goal on SkillStacker?",
    options: [
      "Learn web development",
      "Get an internship/job",
      "Build a portfolio",
      "Improve interview skills",
    ],
  },
  {
    id: "level",
    question: "How would you describe your current skill level?",
    options: ["Absolute Beginner", "Intermediate", "Advanced"],
  },
  {
    id: "interest",
    question: "Which field interests you the most?",
    options: [
      "Web Development",
      "Data Science",
      "Mobile Apps",
      "Competitive Programming",
      "System Design",
    ],
  },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = async (option) => {
    const updatedAnswers = {
      ...answers,
      [questions[current].id]: option,
    };

    setAnswers(updatedAnswers);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      localStorage.setItem(
        "skillstacker_onboarding",
        JSON.stringify(updatedAnswers)
      );

     try {

  // const user = JSON.parse(
  //   localStorage.getItem("user")
  // );

  // const response = await axios.put(

  //   `http://localhost:5000/api/users/onboarding/${user.id}`,

  //   updatedAnswers
  // );

  console.log(response.data);

} catch (error) {

  console.log(error);
}

      navigate("/dashboard");
    }
  };

  return (
    <div className="onboarding-wrapper">
      <div className="container">
        <h1>Welcome to SkillStacker</h1>

        <div className="question">
          {questions[current].question}
        </div>

        <div className="options">
          {questions[current].options.map((option) => (
            <div
              key={option}
              className="option"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </div>
          ))}
        </div>

        <div className="progress">
          Step {current + 1} of {questions.length}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
