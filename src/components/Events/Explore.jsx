import React from "react";
import { explore } from "../../data";

const Explore = () => {
  return (
    <section className="explore">
      <div className="container">
        <h2 className="trending__categories">Explore by Category</h2>
        <div className="explore__container">
          <div className="explore__wrapper">
            {explore.map(({ id, icon, title }) => {
              return (
                <div className="explore__value" key={id}>
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

export default Explore;
