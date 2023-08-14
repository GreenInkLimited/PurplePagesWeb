import React, { useState, useRef } from "react";
import Logo from "../../assets/pplogo.png";
import { MdArrowBack } from "react-icons/md";
import { Formik, Form, Field } from "formik";
import { AddEventDetails } from "../../apis/EventsApis";
import { useMutation } from "react-query";
import {
  RiImageAddLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiCalendar2Line,
} from "react-icons/ri";
import { Link } from "react-router-dom";

const CreateTicket = ({ onNext, onPrev }) => {
  const [isActiveType, setIsActiveType] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const types = ["Free", "Paid"];

  const initialValues = {
    choose_dates: "",
    ticket_type: "",
    ticket_name: "",
    quantity: "",
    ticket_price: "",
  };

  const handleSubmit = async (values) => {
    if (!selectedType) {
      alert("Please select ticket type."); // You can display an error message or handle validation as needed
      return;
    }
    const updatedValues = {
      ...values,
      ticket_type: selectedType,
    };
    console.log("create ticket", updatedValues);
    onNext(updatedValues);
  };

  return (
    <div className="modal__background">
      <div className="personal__account__form-container">
        <div className="persornal__account__form-top">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
          <div className="persornal__account__form-back" onClick={onPrev}>
            <MdArrowBack /> <p>back</p>
          </div>
        </div>
        <div className="persornal__account__form-wrapper">
          <div className="events__scroller-123">
            <div className="events__scroller-123content complete">
              <p>1</p>
            </div>

            <div className="events__scroller-123contentcomplete active">
              <p>2</p>
            </div>
            <div className="events__scroller-123contentactive">
              <p>3</p>
            </div>
          </div>

          <div className="persornal__account__main-form">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form>
                <label>
                  Ticket type<small>(required)</small>
                </label>
                <Field name="ticket_type">
                  {({ field }) => (
                    <div className="dropdownx">
                      <div
                        className="dropdown-btn"
                        onClick={() => setIsActiveType(!isActiveType)}
                      >
                        {selectedType || field.value || "select type"}{" "}
                        {/* Add the placeholder text */}
                        <div className="dropdown-icons">
                          {isActiveType ? (
                            <RiArrowUpSLine className="dropdown-icon" />
                          ) : (
                            <RiArrowDownSLine className="dropdown-icon" />
                          )}
                        </div>
                      </div>
                      {isActiveType && (
                        <div className="dropdown-content">
                          {types.map((option) => (
                            <div
                              key={option}
                              onClick={() => {
                                setSelectedType(option);
                                setIsActiveType(false);
                                field.onChange({ target: { value: option } });
                              }}
                              className="dropdown-item"
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </Field>
                <label>
                  Ticket name <small>(required)</small>
                </label>
                <Field
                  className="personal__inputx"
                  type="text"
                  name="ticket_name"
                  placeholder="Ticket Name"
                  required
                />
                <label>
                  Quantity <small>(required)</small>
                </label>
                <Field
                  className="personal__inputx"
                  type="number"
                  name="quantity"
                  placeholder="1"
                  required
                />
                {selectedType === "Paid" && (
                  <>
                    <label>
                      Ticket Price <small>(required)</small>
                    </label>
                    <Field
                      className="personal__inputx"
                      type="text"
                      name="ticket_price"
                      placeholder="Ticket Price"
                      required={selectedType === "Paid"}
                    />
                  </>
                )}

                <button className="personal__inputx button"> Proceed</button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
