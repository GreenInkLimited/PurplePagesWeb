import React from "react";
import { programs } from "../../data";
import Card from "../../UI/Card";

const BusinessAndBrand = () => {
  return (
    <section className="businessandbrand">
      <div className="container businessandbrand__container">
        <h2>Purple Pages for Business Owners & Personal Brands</h2>

        <div className="businessandbrand__wrapper">
          {programs.map(({ id, icon, title, info, path }) => {
            return (
              <div className="businessandbrand__program">
                <Card className="businessandbrand__program" key={id}>
                  <img src={icon} />
                  <h4>{title}</h4>
                  <p>{info}</p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BusinessAndBrand;
