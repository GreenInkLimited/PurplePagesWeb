import React, { useState } from "react";
import SectionHead from "./SectionHead";
import Card from "../UI/Card";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { testimonials } from "../data";

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const { name, quote, job, avatar } = testimonials.slice(index, index + 2);

  const prevTestimonialHandler = () => {
    setIndex((prev) => {
      if (prev === 0) {
        return testimonials.length - 2;
      } else {
        return prev - 2;
      }
    });
  };

  const nextTestimonialHandler = () => {
    setIndex((prev) => {
      if (prev === testimonials.length - 2) {
        return 0;
      } else {
        return prev + 2;
      }
    });
  };

  return (
    <section className="testimonials">
      <SectionHead
        title="Coverage across all 36 states of Nigeria"
        className="testimonials__head"
      />

      <div className="container testimonials__container">
        <div className="testimonials__btn-container">
          <button
            className="testimonials__btn"
            onClick={prevTestimonialHandler}
          >
            <IoIosArrowDropleftCircle />
          </button>
        </div>
        {testimonials.slice(index, index + 2).map((testimonial) => (
          <Card key={testimonial.name} className="testimonial">
            <div className="testimonial__avatar">
              <img src={testimonial.avatar} alt={testimonial.name} />
            </div>
            <p className="testimonial__quote">{`"${testimonial.quote}"`}</p>
            <h5>{testimonial.name}</h5>
            <small className="testimonial__title">{testimonial.job}</small>
          </Card>
        ))}
        <div className="testimonials__btn-container">
          <button
            className="testimonials__btn"
            onClick={nextTestimonialHandler}
          >
            <IoIosArrowDroprightCircle />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
