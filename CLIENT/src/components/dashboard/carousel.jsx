import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import "./carousel.css";

import {
  Pagination,
  Autoplay
} from "swiper/modules";

import CarouselCard from "./CarouselCard";

const Carousel = () => {

  const slides = [

    {
      title: "Roadmap",

      desc:
        "Your personalized step-by-step learning path designed for focused growth.",

      route: "/roadmap",

      image:
        "/images/roadmap.png",
    },

    {
      title: "Resources",

      desc:
        "Best curated videos, docs, and content selected for your journey.",

      route: "/resources",

      image:
        "/images/resources.png",
    },

    {
      title: "Next Actions",

      desc:
        "Know exactly what to do today, this week, and this month.",

      route: "/next-actions",

      image:
        "/images/actions.png",
    },

    {
      title: "Senior Advice",

      desc:
        "Real-world guidance from experienced developers and mentors.",

      route: "/senior-advice",

      image:
        "/images/advice.png",
    },
  ];

  return (

    <div className="carousel-wrapper">

      <Swiper

        modules={[
          Pagination,
          Autoplay
        ]}

        slidesPerView={1}

        spaceBetween={30}

        loop={true}

        speed={1200}

        centeredSlides={true}

        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}

        pagination={{
          clickable: true
        }}
      >

        {slides.map(
          (slide, index) => (

            <SwiperSlide
              key={index}
            >

              <CarouselCard
                slide={slide}
              />

            </SwiperSlide>
          )
        )}

      </Swiper>

    </div>
  );
};

export default Carousel;