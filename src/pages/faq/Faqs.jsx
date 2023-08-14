import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { getFaqs } from "../../apis/FaqApis";
import "./faqs.css";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await getFaqs({ pageParam: 0 });
        setFaqs(response || []); // Set the response directly as the faqs state
      } catch (error) {
        console.log("Error fetching faqs:", error);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container faqs">
        <h2>Frequently Asked Questions</h2>
        <div className="faqs__wrapper">
          {faqs.length > 0 &&
            faqs.map((item, i) => (
              <div className="accordion" key={i}>
                <div className="item">
                  <div className="title" onClick={() => toggle(i)}>
                    <p>
                      <b>{item.question}</b>
                    </p>
                    <span>
                      {selected === i ? (
                        <RiArrowDropUpLine />
                      ) : (
                        <RiArrowDropDownLine />
                      )}
                    </span>
                  </div>
                  <div
                    className={
                      selected === i
                        ? "accordion__content show"
                        : "accordion__content"
                    }
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Faqs;
