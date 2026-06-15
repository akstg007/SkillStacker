import { useEffect, useState } from "react";
import { collegeResources } from "../data/collegeResources";
import "./resources.css";
import Navbar from "../components/common/Navbar";

const Resources = () => {
  const [resources, setResources] = useState(null);
  const [skill, setSkill] = useState("");

  useEffect(() => {
    const onboardingData = JSON.parse(
      localStorage.getItem("skillstacker_onboarding")
    );

    if (!onboardingData) return;

    const selectedSkill = onboardingData.interest;

    setSkill(selectedSkill);
    setResources(collegeResources[selectedSkill]);
  }, []);

  if (!resources) {
    return (
      <div className="resources-page">
        <h2>
  We are currently curating resources for {skill}.
</h2>

<button
  onClick={() => window.history.back()}
>
  Go Back
</button>
      </div>
    );
  }


  return (
      <>
    <Navbar />
    <div className="resources-page">

      <h1>{skill} Resources</h1>

      {/* YOUTUBE */}

      <section>
        <h2>🎥 YouTube Channels</h2>

        <div className="card-grid">
          {resources.youtube.map((yt, index) => (
            <div className="resource-card" key={index}>
              <h3>{yt.name}</h3>
              <p>{yt.reason}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DOCS */}

      <section>
        <h2>📚 Documentation</h2>

        <div className="card-grid">
          {resources.documentation.map((doc, index) => (
            <div className="resource-card" key={index}>
              <h3>{doc.name}</h3>
              <p>{doc.reason}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ORDER */}

      <section>
        <h2>🛣 Recommended Order</h2>

        <div className="timeline">
          {resources.orderToFollow.map((step, index) => (
            <div className="timeline-item" key={index}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AVOID */}

      <section>
        <h2>⚠ Avoid These Mistakes</h2>

        <div className="card-grid">
          {resources.avoid.map((item, index) => (
            <div className="warning-card" key={index}>
              ❌ {item}
            </div>
          ))}
        </div>
      </section>

    </div>
    </>
  );
};

export default Resources;