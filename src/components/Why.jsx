import React from "react";
import SectionHeader from "./SectionHeader";
import { programs } from "../data";
import Card from "../UI/Card";

const Why = () => {
  return (
    <section className="programs">
      <div className="container programs__container">
        <SectionHeader title="Why Purple Pages" />
      </div>
      <div className="programs__wrapper">
        {programs.map(({ id, icon, title, info }) => {
          return (
            <Card className="programs__program" key={id}>
              <span>{icon}</span>
              <h4>{title}</h4>
              <small>{info}</small>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default Why;
