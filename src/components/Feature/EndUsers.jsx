import React from "react";
import Image from "../../assets/app.png";
import { enduser } from "../../data";
import Card from "../../UI/Card";
import SectionHead from "../SectionHead";

const EndUsers = () => {
  return (
    <section className="enduser">
      <div className="container">
        <h2>Purple Pages for End Users</h2>
        <div className="enduser__container">
          <div className="enduser__left">
            <div className="enduser__image">
              <img src={Image} alt="what we do" />
            </div>
          </div>
          <div className="enduser__right">
            <div className="enduser__wrapper">
              {enduser.map(({ id, icon, desc }) => {
                return (
                  <Card className="enduser__value" key={id}>
                    <img src={icon} alt="icon" />
                    <p>{desc}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EndUsers;
