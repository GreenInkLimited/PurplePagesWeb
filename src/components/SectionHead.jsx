import React from "react";

const SectionHead = ({ title, paragraph, className }) => {
  return (
    <div className={`section__head ${className}`}>
      <h2>{title}</h2>
      <p>{paragraph}</p>
    </div>
  );
};

export default SectionHead;
