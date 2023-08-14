import React, { useState, useEffect } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { useMediaQuery } from "@material-ui/core";
import { countries } from "../../data";

const Coverage = () => {
  const [index, setIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const prevTestimonialHandler = () => {
    setIndex((prev) =>
      prev === 0 ? countries.length - (isMobile ? 4 : 136) : prev - 1
    );
  };

  const nextTestimonialHandler = () => {
    setIndex((prev) =>
      prev === countries.length - (isMobile ? 4 : 136) ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) =>
        prev === countries.length - (isMobile ? 4 : 136) ? 0 : prev + 1
      );
    }, 3000); // Adjust the interval duration (in milliseconds) as needed

    return () => {
      clearInterval(interval);
    };
  }, [isMobile]);

  return (
    <section className="testimonials">
      <h2 className="testimonials__head">
        Coverage across all 36 states of Nigeria
      </h2>

      <div className="container testimonials__container">
        <div className="testimonials__btn-container">
          <button
            className="testimonials__btn"
            onClick={prevTestimonialHandler}
          >
            <MdNavigateBefore />
          </button>
        </div>
        <div className="testimonials__marquee">
          {/* Wrap the marquee content with a container */}
          <div className="testimonials__marquee-content">
            {countries.map((country, idx) => (
              <div key={country.name} className="testimonial">
                <p className="testimonial__quote">{country.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="testimonials__btn-container">
          <button
            className="testimonials__btn"
            onClick={nextTestimonialHandler}
          >
            <MdNavigateNext />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
