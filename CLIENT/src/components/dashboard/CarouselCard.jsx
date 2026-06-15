import { useNavigate } from "react-router-dom";

import "./carousel.css";

const CarouselCard = ({ slide }) => {

  const navigate = useNavigate();

  return (

    <div className="modern-carousel-card">

      {/* IMAGE */}

      <img
        src={slide.image}
        alt={slide.title}
        className="carousel-main-image"
      />

      {/* BUTTON */}

      <button
        className="carousel-btn"
        onClick={() =>
          navigate(slide.route)
        }
      >
        Explore →
      </button>

    </div>
  );
};

export default CarouselCard;