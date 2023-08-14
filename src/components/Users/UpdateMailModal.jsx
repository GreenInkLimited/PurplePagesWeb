import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MdClear } from "react-icons/md";
import { UpdateMailSettings } from "../../apis/BusinessApi";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import * as Yup from "yup";

const UpdateMailModal = ({ onCancel, businessId }) => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No File Selected");
  const [verificationError, setVerificationError] = useState("");
  const [previewURL, setPreviewURL] = useState(null);
  const modalRef = useRef(null); // Reference to the modal element

  const handleCancel = () => {
    onCancel(); // Invoke the onCancel function passed from the parent component
  };

  const navigate = useNavigate();

  const { isLoading, error, isError, mutateAsync, data } = useMutation(
    "Update mail",
    UpdateMailSettings,
    {
      onSuccess: (data) => {
        if (data && data.status_lean) {
          // Verification successful
          navigate("/personal");
        } else {
          // Verification unsuccessful
          setVerificationError("Something is wrong");
          // You can perform any additional actions here, such as showing an error message
        }
      },
    }
  );

  const handleClickOutsideModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCancel();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

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
    email_host: "p3plmcpnl489403.prod.phx3.secureserver.net",
    email_host_user: "",

    email_host_password: "",
    email_port: 587,
    business_id: businessId,
  };

  const validationSchema = Yup.object({
    email_host_user: Yup.string().required("Email Host User is Required"),
    email_host_password: Yup.string().required("Password is Required"),
  });

  const handleSubmit = (values) => {
    const updatedValues = {
      ...values,
      business_id: businessId,
      // Include the image value
    };
    mutateAsync(updatedValues)
      .then((data) => {
        // Handle success
      })
      .catch((error) => {
        console.error("Error sending mail:", error);
      });
  };

  return (
    <div className="container">
      <div className="create__business-container" ref={modalRef}>
        <div className="create__business-header">
          <MdClear onClick={handleCancel} />
          <div className="create__business-detail">
            <h4>Send mail to subscribers</h4>
          </div>
        </div>
        <p className="send__mail-gist">Send email to your subscribers</p>
        <div className="create__business-body">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <label>Email Host User</label>
              <Field
                className="input"
                type="text"
                name="email_host_user"
                placeholder="Enter discount"
              />
              <ErrorMessage
                name="email_host_user"
                component="small"
                className="error-message"
              />

              <label>Email Host Password</label>
              <Field
                className="input"
                type="text"
                name="email_host_password"
                placeholder="Enter discount"
              />
              <ErrorMessage
                name="email_host_password"
                component="small"
                className="error-message"
              />

              <div className="create__binex-button">
                <button className="user_user__button" type="submit">
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UpdateMailModal;
