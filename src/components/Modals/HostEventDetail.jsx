import React, { useState, useRef } from "react";
import Logo from "../../assets/pplogo.png";
import { MdArrowBack } from "react-icons/md";
import { Formik, Form, Field } from "formik";
import { AddEventDetails } from "../../apis/EventsApis";
import {
  RiImageAddLine,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiCalendar2Line,
} from "react-icons/ri";
import { useMutation } from "react-query";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const HostEventDetail = ({ onNext, formData }) => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No File Selected");
  const [previewURL, setPreviewURL] = useState(null);

  const [isActiveCategory, setIsActiveCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = [
    "House Party",
    "Food & Drink",
    "Concert",
    "Business",
    "Tech",
    "SMEs",
    "Dinner",
    "Seminar",
  ];

  const [isActiveFrequency, setIsActiveFrequency] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState("");
  const frequencies = ["One Time", "Recurring"];

  const [isActiveFrom, setIsActiveFrom] = useState(false);
  const [selectedFrom, setSelectedFrom] = useState("");
  const from = ["11/12/22", "10/12/22"];

  const [isActiveTo, setIsActiveTo] = useState(false);
  const [selectedTo, setSelectedTo] = useState("");
  const to = ["11/12/22", "10/12/22"];

  const [isActiveFreq, setIsActiveFreq] = useState(false);
  const [selectedFreq, setSelectedFreq] = useState("");
  const freq = ["Daily", "Weekly", "Bi-Weekly"];

  const [isActiveDays, setIsActiveDays] = useState(false);
  const [selectedDays, setSelectedDays] = useState("");
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setImage(file);
      const previewURL = URL.createObjectURL(file);
      setPreviewURL(previewURL);
    }
  };

  const initialValues = {
    event_name: "",
    event_description: "",
    event_category: "",
    event_location: "",
    event_frequency: "",
    from_date: "",
    to_date: "",
    ticket_type: "",
    ticket_name: "",
    quantity: "",
    ticket_price: "",
    event_flier: "",
    event_time: "",
    start_time: "",
    end_time: "",
    frequency: "",
    days: "",
    end_date: "",
  };

  const handleSubmit = async (values) => {
    if (!selectedFrequency) {
      alert("Please select the event frequency."); // You can display an error message or handle validation as needed
      return;
    }
    const updatedValues = {
      ...values,
      event_flier: image,
      event_category: selectedCategory,
      event_frequency: selectedFrequency,
      frequency: selectedFreq,
      days: selectedDays,
      event_description: values.event_description.replace(/\n/g, "<br>"),
    };
    console.log("values", updatedValues);
    console.log("form data", formData);
    onNext(updatedValues);
  };

  return (
    <div className="modal__background">
      <div className="personal__account__form-container">
        <div className="persornal__account__form-top">
          <Link to="/">
            <img src={Logo} alt="logo" />

            <div className="persornal__account__form-back">
              <p>Go home</p>
            </div>
          </Link>
        </div>
        <div className="persornal__account__form-wrapper">
          <div className="events__scroller-123">
            <div className="events__scroller-123content active">
              <p>1</p>
            </div>
            <div className="events__scroller-123contentactive">
              <p>2</p>
            </div>
            <div className="events__scroller-123content">
              <p>3</p>
            </div>
          </div>
          <div className="persornal__account__main-form">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form>
                <label>
                  Event Name <small>(required)</small>
                </label>
                <Field
                  className="personal__inputx"
                  type="text"
                  name="event_name"
                  placeholder="Enter name"
                  required
                />
                <label>
                  Event Description <small>(required)</small>
                </label>
                <Field
                  as="textarea"
                  className="personal__inputx"
                  type="text"
                  name="event_description"
                  placeholder="Tell us about your event including the activities and relevant #"
                  required
                />

                <label>
                  Event Category <small>(required)</small>
                </label>
                <Field name="event_category" className="input">
                  {({ field }) => (
                    <div className="dropdownx">
                      <div
                        className="dropdown-btn"
                        onClick={() => setIsActiveCategory(!isActiveCategory)}
                      >
                        {selectedCategory || field.value || "Select Category"}{" "}
                        {/* Add the placeholder text */}
                        <div className="dropdown-icons">
                          {isActiveCategory ? (
                            <RiArrowUpSLine className="dropdown-icon" />
                          ) : (
                            <RiArrowDownSLine className="dropdown-icon" />
                          )}
                        </div>
                      </div>
                      {isActiveCategory && (
                        <div className="dropdown-content">
                          {categories.map((option) => (
                            <div
                              key={option}
                              onClick={() => {
                                setSelectedCategory(option);
                                setIsActiveCategory(false);
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
                  Upload event flier <small>(required)</small>
                </label>
                <div
                  className="upload__file-containerx"
                  onClick={() => document.querySelector(".logo-input").click()}
                >
                  <Field
                    className="input-field logo-input"
                    type="file"
                    accept="image/jpeg, image/png"
                    name="event_flier"
                    hidden
                    onChange={handleLogoUpload}
                  />
                  {previewURL ? (
                    <img
                      src={previewURL}
                      alt={fileName}
                      className="myuploaded-image"
                    />
                  ) : (
                    <div className="clip__icon-container">
                      <RiImageAddLine className="clip__icon" color="#EBB8FC" />
                      <p>click to upload</p>
                    </div>
                  )}
                </div>
                <label>
                  Event Location <small>(required)</small>
                </label>
                <Field
                  className="personal__inputx"
                  type="text"
                  name="event_location"
                  placeholder="Enter Location"
                  required
                />

                <label>
                  Event Frequency <small>(required)</small>
                </label>
                <Field name="event_frequency" required>
                  {({ field }) => (
                    <div className="dropdownx">
                      <div
                        className="dropdown-btn"
                        onClick={() => setIsActiveFrequency(!isActiveFrequency)}
                      >
                        {selectedFrequency || field.value || "Select Frequency"}{" "}
                        {/* Add the placeholder text */}
                        <div className="dropdown-icons">
                          {isActiveFrequency ? (
                            <RiArrowUpSLine className="dropdown-icon" />
                          ) : (
                            <RiArrowDownSLine className="dropdown-icon" />
                          )}
                        </div>
                      </div>
                      {isActiveFrequency && (
                        <div className="dropdown-content">
                          {frequencies.map((option) => (
                            <div
                              key={option}
                              onClick={() => {
                                setSelectedFrequency(option);
                                setIsActiveFrequency(false);
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

                {selectedFrequency === "One Time" && (
                  <>
                    <div className="create__business__rowxyz">
                      <div>
                        <label>
                          From <small>(required)</small>
                        </label>
                        <div className="input__divxyz">
                          <Field
                            className="personal__inputxyz"
                            type="text"
                            name="from_date"
                            placeholder="dd/mm/yyyy"
                            required={selectedFrequency === "One Time"}
                          />
                          <button
                            type="button"
                            className="password-toggle-button"
                          >
                            {" "}
                            <RiCalendar2Line />
                          </button>
                        </div>
                      </div>
                      <div>
                        <label>
                          To <small>(required)</small>
                        </label>
                        <div className="input__divxyz">
                          <Field
                            className="personal__inputxyz"
                            type="text"
                            name="to_date"
                            placeholder="dd/mm/yyyy"
                            required={selectedFrequency === "One Time"}
                          />
                          <button
                            type="button"
                            className="password-toggle-button"
                          >
                            {" "}
                            <RiCalendar2Line />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedFrequency === "Recurring" && (
                  <>
                    <div className="create__business__rowxyz">
                      <div>
                        <p>
                          Start Time <small>(required)</small>
                        </p>
                        <Field
                          className="personal__inputx"
                          type="text"
                          name="start_time"
                          placeholder="3pm"
                          required={selectedFrequency === "Recurring"}
                        />
                      </div>
                      <div>
                        <p>
                          End Time <small>(required)</small>
                        </p>
                        <Field
                          className="personal__inputx"
                          type="text"
                          name="end_time"
                          placeholder="12pm"
                          required={selectedFrequency === "Recurring"}
                        />
                      </div>
                    </div>
                    <label>Frequency </label>
                    <Field name="frequency" className="input">
                      {({ field }) => (
                        <div className="dropdownx">
                          <div
                            className="dropdown-btn"
                            onClick={() => {
                              setIsActiveFreq(!isActiveFreq);
                              setSelectedFreq("");
                              setSelectedFreq("");
                            }}
                          >
                            {selectedFreq || field.value || "Select Frequency"}{" "}
                            {/* Add the placeholder text */}
                            <div className="dropdown-icons">
                              {isActiveFreq ? (
                                <RiArrowUpSLine className="dropdown-icon" />
                              ) : (
                                <RiArrowDownSLine className="dropdown-icon" />
                              )}
                            </div>
                          </div>
                          {isActiveFreq && (
                            <div className="dropdown-content">
                              {freq.map((option) => (
                                <div
                                  key={option}
                                  onClick={() => {
                                    setSelectedFreq(option);
                                    setIsActiveFreq(false);
                                    field.onChange({
                                      target: { value: option },
                                    });
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
                    {selectedFreq !== "Daily" && (
                      <>
                        <label>Days </label>
                        <Field name="days" className="input">
                          {({ field }) => (
                            <div className="dropdownx">
                              <div
                                className="dropdown-btn"
                                onClick={() => {
                                  setIsActiveDays(!isActiveDays);
                                  setSelectedDays("");
                                  setSelectedDays("");
                                }}
                              >
                                {selectedDays || field.value || "Select Day"}{" "}
                                {/* Add the placeholder text */}
                                <div className="dropdown-icons">
                                  {isActiveDays ? (
                                    <RiArrowUpSLine className="dropdown-icon" />
                                  ) : (
                                    <RiArrowDownSLine className="dropdown-icon" />
                                  )}
                                </div>
                              </div>
                              {isActiveDays && (
                                <div className="dropdown-content">
                                  {days.map((option) => (
                                    <div
                                      key={option}
                                      onClick={() => {
                                        setSelectedDays(option);
                                        setIsActiveDays(false);
                                        field.onChange({
                                          target: { value: option },
                                        });
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
                      </>
                    )}
                    <label>
                      End Date <small>(required)</small>
                    </label>
                    <div className="input__divxyz">
                      <Field
                        className="personal__inputxyz"
                        type="text"
                        name="end_date"
                        placeholder="dd/mm/yyyy"
                        required={selectedFrequency === "Recurring"}
                      />
                      <button type="button" className="password-toggle-button">
                        {" "}
                        <RiCalendar2Line />
                      </button>
                    </div>
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

export default HostEventDetail;
