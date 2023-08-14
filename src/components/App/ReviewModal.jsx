import React, { useState } from "react";
import { MdClear } from "react-icons/md";
import { BsStarFill } from "react-icons/bs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { RiImageAddLine } from "react-icons/ri";
import { useMutation, useQueryClient } from "react-query";
import { ReviewBusiness } from "../../apis/BusinessApi";

const ReviewModal = ({ closeModal, businessId }) => {
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No File Selected");
  const [verificationError, setVerificationError] = useState("");
  const [previewURL, setPreviewURL] = useState(null);
  const queryClient = useQueryClient();

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setImage(file);
      const previewURL = URL.createObjectURL(file);
      setPreviewURL(previewURL);
    }
  };

  const { isLoading, error, isError, mutateAsync, data } = useMutation(
    "add review",
    ReviewBusiness,
    {
      onSuccess: (data) => {
        // Handle the successful response from the API
        // For example, close the modal or perform any additional actions
        closeModal();
        queryClient.invalidateQueries("business");
      },
      onError: (error) => {
        // Handle any errors
        console.error("Failed to add review:", error);
      },
    }
  );

  return (
    <div className="container">
      <div className="review__business-container">
        <div className="review__header-sub">
          <p>Tell us what you think</p>
          <MdClear onClick={closeModal} className="review__header-sub-icon" />
        </div>

        <div className="review__body-rating-sub">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleStarClick(star)}
              style={{ cursor: "pointer" }}
            >
              {star <= rating ? (
                <BsStarFill className="star-icon-selected" />
              ) : (
                <BsStarFill className="star-icon" />
              )}
            </span>
          ))}
        </div>

        <Formik
          initialValues={{
            title: "",
            business_id: businessId,
          }}
          onSubmit={async (values) => {
            try {
              // Prepare the review data object to send to the API
              const reviewData = {
                rating,
                image,
                detail: values.title,
                business_id: businessId,
              };

              // Trigger the API call using mutateAsync
              await mutateAsync(reviewData);
            } catch (error) {
              // Handle any errors
              console.error("Failed to add review:", error);
            }
          }}
        >
          <Form>
            <label>Title</label>
            <Field
              className="input"
              type="text"
              name="title"
              placeholder="Text"
            />

            <label>Upload your photo(s)/video</label>
            <div
              className="upload__file-container"
              onClick={() => document.querySelector(".logo-input").click()}
            >
              <Field
                className="input-field logo-input"
                type="file"
                accept="image/jpeg, image/png"
                name="image"
                hidden
                onChange={handleLogoUpload}
              />
              {previewURL ? (
                <img
                  src={previewURL}
                  alt={fileName}
                  className="uploaded-image"
                />
              ) : (
                <div className="logo-placeholder">
                  <RiImageAddLine
                    color="#EBB8FC"
                    className="logo-placeholder-icon"
                  />
                </div>
              )}
            </div>
            <ErrorMessage
              name="image"
              component="div"
              className="error-message"
            />

            {verificationError && (
              <div className="verification__error-container">
                <p className="verification__error-message">
                  {verificationError}
                </p>
              </div>
            )}

            <div className="review__button-container">
              <button
                type="submit"
                disabled={isLoading}
                className="button review__button subscribe"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ReviewModal;
