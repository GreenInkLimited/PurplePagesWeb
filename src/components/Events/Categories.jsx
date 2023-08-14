import React from "react";
import { categories } from "../../data";

const Categories = ({ onCategoryClick }) => {
  return (
    <section className="events">
      <div className="container">
        <h2 className="trending__categories">Trending Categories</h2>
        <div className="events__container">
          <div className="events__wrapper">
            {categories.map(({ id, icon, title, path }) => {
              return (
                <div
                  className="events__value"
                  key={id}
                  onClick={() => onCategoryClick(title)} // Call the event handler on click
                >
                  <img src={icon} alt="icon" />
                  <p>{title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
