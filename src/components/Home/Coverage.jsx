import React, { useState } from 'react';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import { useMediaQuery } from '@material-ui/core';
import { countries } from '../../data';

const Coverage = () => {
  const [index, setIndex] = useState(0);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const { name } = countries.slice(index, index + (isMobile ? 4 : 7));

  const prevTestimonialHandler = () => {
    setIndex((prev) => {
      if (prev === 0) {
        return countries.length - (isMobile ? 4 : 7);
      } else {
        return prev - 1;
      }
    });
  };

  const nextTestimonialHandler = () => {
    setIndex((prev) => {
      if (prev === countries.length - (isMobile ? 4 : 7)) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  };

  return (
    <section className="testimonials">
      <h2 className="testimonials__head">Coverage across all 36 states of Nigeria</h2>

      <div className="container testimonials__container">
        <div className="testimonials__btn-container">
          <button className="testimonials__btn" onClick={prevTestimonialHandler}>
            <MdNavigateBefore/>
          </button>
        </div>
        {countries.slice(index, index + (isMobile ? 4 : 7)).map((country) => (
          <div key={country.name} className="testimonial">
            <p className="testimonial__quote">{country.name}</p>
          </div>
        ))}
        <div className="testimonials__btn-container">
          <button className="testimonials__btn" onClick={nextTestimonialHandler}>
            <MdNavigateNext />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Coverage;