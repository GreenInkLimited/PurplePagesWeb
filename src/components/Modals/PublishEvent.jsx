import React, { useState, useRef } from "react";
import Logo from "../../assets/pplogo.png";
import { MdArrowBack } from "react-icons/md";
import { RiCalendarEventFill, RiTimeLine, RiTicket2Line } from "react-icons/ri";
import { TiLocationOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PublishEvent = ({
  onNext,
  onPrev,
  onSubmit,
  formData,
  hostEventDetail,
}) => {
  const [isActiveType, setIsActiveType] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const types = ["Free", "Paid"];
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    event_name: "",
    event_description: "",
    event_category: "",
    event_location: "",
    event_frequency: "",
    from_date: "",
    to_date: "",
    choose_dates: "",
    ticket_type: "",
    ticket_name: "",
    quantity: "",
    ticket_price: "",
    event_flier: "",
  };

  const handleSubmit = async (values) => {
    const updatedValues = {
      ...values,
      ticket_type: selectedType,
    };

    try {
      setIsSubmitting(true); // Set submitting state to true
      // Call your onSubmit function here
      await onSubmit(updatedValues);
      // Redirect to the event page after successful submission
      navigate("/success"); // Replace '/event' with the actual route to your event page
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false); // Set submitting state back to false
    }
  };

  console.log("publishs event", formData);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    const day = date.getDate();
    let daySuffix = "th";
    if (day === 1 || day === 21 || day === 31) {
      daySuffix = "st";
    } else if (day === 2 || day === 22) {
      daySuffix = "nd";
    } else if (day === 3 || day === 23) {
      daySuffix = "rd";
    }
    const formattedDate = date.toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });
    return `${day}${daySuffix} of ${formattedDate}`;
  };

  return (
    <div className="modal__background">
      <div className="personal__account__form-container">
        <div className="persornal__account__form-top">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
          <div className="persornal__account__form-back">
            <MdArrowBack onClick={onPrev} /> <p onClick={onPrev}>back</p>
          </div>
        </div>
        <div className="persornal__account__form-wrapper">
          <div className="events__scroller-123">
            <div className="events__scroller-123content complete">
              <p>1</p>
            </div>

            <div className="events__scroller-123contentcomplete complete">
              <p>2</p>
            </div>
            <div className="events__scroller-123contentactive active">
              <p>3</p>
            </div>
          </div>

          <div className="persornal__account__main-form">
            <div className="stepper__publish-paragraph">
              <p>
                Review your event or click on publish to make your event public
              </p>
            </div>
            <div className="stepper__form-event__details">
              <img src={URL.createObjectURL(formData.event_flier)} alt="" />
              <div className="stepper__form-event__details-right">
                <h2>{formData.event_name}</h2>
                {formData.from_date && formData.to_date ? (
                  <div className="preview__your-event">
                    <RiCalendarEventFill className="preview__your-event-icon" />
                    <p>
                      {formData.from_date} - {formData.to_date}
                    </p>
                  </div>
                ) : (
                  <div className="preview__your-event">
                    <RiCalendarEventFill className="preview__your-event-icon" />
                    <p>
                      {formData.days}, {formatDate(formData.end_date)}
                    </p>
                  </div>
                )}
                {formData.start_time && formData.end_time ? (
                  <div className="preview__your-event">
                    <RiTimeLine className="preview__your-event-icon" />
                    <p>
                      {formData.start_time} - {formData.end_time}
                    </p>
                  </div>
                ) : (
                  <></>
                )}
                <div className="preview__your-event">
                  <TiLocationOutline className="preview__your-event-icon" />
                  <p>{formData.event_location}</p>
                </div>
                <div className="preview__your-event">
                  <RiTicket2Line className="preview__your-event-icon" />
                  <p>0/{formData.quantity}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="botton__breaker">
            <button
              className="personal__input button"
              type="submit"
              onClick={handleSubmit}
            >
              {isSubmitting ? "Publishing event..." : "Publish your event"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishEvent;
