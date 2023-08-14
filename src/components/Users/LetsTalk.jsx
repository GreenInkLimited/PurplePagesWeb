import React, { useRef, useState } from "react";
import styled from "styled-components";
import { ContactUsInput } from "../../apis";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const LetsTalk = () => {
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
    <StyledContactForm>
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
            placeholder="placeholder text"
          />
          <label>Email</label>
          <Field
            className="input"
            type="email"
            name="email"
            placeholder="placeholder text"
          />
          <label>Message</label>
          <Field
            as="textarea"
            className="textarea"
            name="message"
            placeholder="What seems to be the problem?"
          />
          <button className="input" type="submit">
            Proceed
          </button>
        </Form>
      </Formik>
    </StyledContactForm>
  );
};

export default LetsTalk;

const StyledContactForm = styled.div`
  width: 400px;
  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;
    .input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);
    }
  }
  .textarea {
    padding: 7px;
    width: 100%;
    height: 260px;
    padding: px;
    outline: none;
    font-family: "avenir-lt-45-book";
    border-radius: 5px;
    border: 1px solid rgb(220, 220, 220);
  }
  label {
    margin-top: 25px;
    font-family: "avenir-lt-45-book";
    margin-bottom: 8px;
  }
  .input[type="submit"] {
    font-family: "avenir-lt-45-book";
    margin-top: 2rem;
    cursor: pointer;
    background: #650585;
    color: white;
    border: none;
  }
  .input::placeholder,
  textarea::placeholder {
    color: #e0e0e0;
    font-family: "avenir-lt-45-book";
    font-size: 12px;
  }
  /* Media query for smaller screens */
  @media (max-width: 600px) {
    width: 100%;
    padding: 20px;
    form {
      align-items: start;
      .input {
        width: 100%;
        margin: 0.5rem 0;
      }
      .textarea {
        width: 100%;
        margin: 0.5rem 0;
      }
    }
  }
`;
