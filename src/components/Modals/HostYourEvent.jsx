import React from "react";
import Personal from '../../assets/Personal.png'
import Corporate from '../../assets/Corporate.png'

function HostYourEvent({ formData, setFormData }) {
  return (
    <>
    <div className="host__event-wrappers">
      <div className="host__event-body" >
          <img src={Personal} />
          <h4>Personal</h4>
          <p>Ideal for individuals and group of friends or people hosting events</p>
      </div>
      <div className="host__event-body">
        <img src={Corporate} />
         <h4>Corporate</h4>
         <p>Best suited for companies and brands hosting events</p>
      </div>
    </div>
    </>
  );
}

export default HostYourEvent;