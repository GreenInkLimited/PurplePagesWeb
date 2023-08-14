import React, { useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdArrowBack } from "react-icons/md";
import Checkout from "../../assets/checkout.png";
import Checkoutb from "../../assets/checkoutb.png";
import "./modal.css";

const CheckingOut = () => {
  const form = useRef();
  const [selected, setSelected] = useState(null);
  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  return (
    <div className="modal__background">
      <div className="checkout__container">
        <div className="checkout__header">
          <MdArrowBack className="close__my-modal" />
        </div>
        <h2>Payment Information</h2>
        <p className="choose__payment">Choose a payment method</p>
        <div className="checkout__body">
          <div className="checkout__body-left">
            <div className="accordionx">
              <div className="itemx">
                <div className="titlex" onClick={() => toggle(1)}>
                  <p>
                    <img src={Checkout} />
                  </p>
                  <span>
                    {selected === 1 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </div>
                <div
                  className={
                    selected === 1
                      ? "accordion__content show"
                      : "accordion__content"
                  }
                >
                  <div className="accordion__form_wrapper">
                    <form ref={form}>
                      <label>
                        Card Number <small>(required)</small>
                      </label>
                      <textarea
                        className="textarea"
                        name="message"
                        placeholder=""
                      />

                      <div className="cvv_expiry_checkout">
                        <div>
                          <label>
                            CVV <small>(required)</small>
                          </label>
                          <textarea
                            className="textarea"
                            name="message"
                            placeholder=""
                          />
                        </div>
                        <div>
                          <label>
                            Expiry date <small>(required)</small>
                          </label>
                          <textarea
                            className="textarea"
                            name="message"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <button type="submit" className="accordion__form-submit">
                        Pay ₦8040
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="accordionx">
              <div className="itemxx">
                <div className="titlex" onClick={() => toggle(2)}>
                  <p>
                    <img src={Checkoutb} />
                  </p>
                  <span>
                    {selected === 2 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </div>
                <div
                  className={
                    selected === 2
                      ? "accordion__content show"
                      : "accordion__content"
                  }
                >
                  <div className="accordion__form_wrapper">
                    <form ref={form}>
                      <label>
                        Card Number <small>(required)</small>
                      </label>
                      <textarea
                        className="textarea"
                        name="message"
                        placeholder=""
                      />

                      <div className="cvv_expiry_checkout">
                        <div>
                          <label>
                            CVV <small>(required)</small>
                          </label>
                          <textarea
                            className="textarea"
                            name="message"
                            placeholder=""
                          />
                        </div>
                        <div>
                          <label>
                            Expiry date <small>(required)</small>
                          </label>
                          <textarea
                            className="textarea"
                            name="message"
                            placeholder=""
                          />
                        </div>
                      </div>

                      <button type="submit" className="accordion__form-submit">
                        Pay ₦8040
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal__xbody-left">
            <h4>Summary</h4>
            <p>2 x The event title goes here</p>
            <div className="modal__payment-sumary">
              <div className="modal__payment-info">
                <div className="modal_subtotal">
                  <p>Sub-total</p>
                  <p>
                    <span className="naira_font">₦</span>8000
                  </p>
                </div>
                <div className="modal_subtotal">
                  <p>Service charge</p>
                  <p>
                    <span className="naira_font">₦</span>40
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <div className="modal__total">
              <p>Total</p>
              <p className="total__madal-price">
                <b>
                  <span className="naira_font">₦</span>8040
                </b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckingOut;
