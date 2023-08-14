import React, { useRef, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./contact.css";
import { ContactUsInput } from "../../apis";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";

const ContactUs = () => {
  const navigate = useNavigate();
  const [contactError, setContactError] = useState("");

  const { isLoading, error, isError, mutateAsync, data } = useMutation(
    "contact",
    ContactUsInput,
    {
      onSuccess: (data) => {
        console.log(data);
        if (data && data.status_lean) {
          // Verification successful
          navigate("/");
        } else {
          // Verification unsuccessful
          setContactError("Password or Username Invalid");
          // You can perform any additional actions here, such as showing an error message
        }
      },
    }
  );

  const validationSchema = Yup.object({
    name: Yup.string().required("name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string().required("Message number is required"),
  });

  return (
    <>
      <Navbar />
      <div className="">
        <div className="container contact__title">
          <h2>Contact Us</h2>
        </div>
        <div className="contact__container">
          <div className="contact__wrapper">
            <p>Kindly fill this form and we’ll respond</p>
            <Formik
              initialValues={{ name: "", email: "", message: "" }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                await mutateAsync({
                  name: values.name,
                  email: values.email,
                  message: values.message,
                });
                console.log(values);
              }}
            >
              <Form>
                <label>Name</label>
                <Field
                  className="input"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                />
                <ErrorMessage
                  name="name"
                  component="small"
                  className="error-message"
                />
                <label>Email</label>
                <Field
                  className="input"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="small"
                  className="error-message"
                />
                <label>Message</label>
                <Field
                  as="textarea"
                  className="textarea"
                  name="message"
                  placeholder="What seems to be the problem?"
                />
                <ErrorMessage
                  name="message"
                  component="small"
                  className="error-message"
                />
                <button className="input" type="submit">
                  Proceed
                </button>
                {contactError && <p className="error">{contactError}</p>}
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
