import React from "react";
import SectionHead from "../SectionHead";
import { why } from "../../data";
import Card from "../../UI/Card";

const Programs = () => {
  return (
    <section className="programs">
      <div className="container programs__container">
        <SectionHead
          title="Why Purple Pages"
          paragraph="Purple Pages was developed with a creative, problem solving objective hinged on these three pillars."
        />

        <div className="programs__wrapper">
          {why.map(({ id, icon, title, info, path }) => {
            return (
              <Card className="programs__program" key={id}>
                <img src={icon} />
                <h4>{title}</h4>
                <p>{info}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Programs;
