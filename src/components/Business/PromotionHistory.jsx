import React from "react";
import { promotionhistory } from "../../data";

const PromotionHistory = () => {
  return (
    <section className="adshistory">
      <div className="adshistory">
        <div className="adshistory__header">
          <h4>Promotions History</h4>
          <p>Promote your business</p>
        </div>
        <div className=" adshistory__wrapper">
          {promotionhistory.map(({ id, icon, title, category, location }) => {
            return (
              <div className="adshistory__content" key={id}>
                <img src={icon} />
                <p>{title}</p>
                <small>{category}</small>
                <p>{location}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PromotionHistory;
