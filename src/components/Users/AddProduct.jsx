import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { MdClear } from "react-icons/md";
import { RiImageAddLine } from "react-icons/ri";
import { AddNewProduct } from "../../apis/BusinessApi";
import { useMutation, useQueryClient } from "react-query";

const AddProduct = ({ onCancel, businessId }) => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No File Selected");
  const [previewURL, setPreviewURL] = useState(null);
  const queryClient = useQueryClient();

  const handleCancel = () => {
    onCancel();
  };

  const { mutateAsync, isLoading } = useMutation("add product", AddNewProduct, {
    onSuccess: () => {
      handleCancel();
      queryClient.invalidateQueries("business"); // Refresh the business data to update the product list
    },
    onError: (error) => {
      console.error("Failed to add product:", error);
    },
  });

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
    caption: "",
    price: "",
    discount: "",
    color: "",
    detail: "",
  };

  const handleSubmit = async (values) => {
    const updatedValues = {
      ...values,
      business_id: businessId,
      image: image,
      detail: values.detail.replace(/\n/g, "<br>"), // Replace newlines with <br> tags
    };
    await mutateAsync(updatedValues);
  };

  return (
    <div className="container">
      <div className="create__business-container">
        <div className="create__business-header">
          <MdClear onClick={handleCancel} />
          <div className="create__business-detail">
            <h4>Add Product</h4>
          </div>
        </div>
        <div className="create__business-body">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
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
                  <RiImageAddLine color="#EBB8FC" />
                )}
              </div>
              <small>
                Your image should be in JPEG or PNG format and video in mp4
              </small>
              <label>Product/Service Title</label>
              <Field
                className="input"
                type="text"
                name="caption"
                placeholder="Enter product title"
              />

              <label>Price</label>
              <Field
                className="input"
                type="text"
                name="price"
                placeholder="Enter price"
              />

              <label>Caption (Optional)</label>
              <Field
                as="textarea"
                className="textareax"
                name="detail"
                placeholder="Enter caption"
              />

              <div className="create__business__row">
                <div>
                  <label>Discount (Optional)</label>
                  <Field
                    className="input"
                    type="text"
                    name="discount"
                    placeholder="Enter discount"
                  />
                </div>
                <div>
                  <label>Choose Colors</label>
                  <Field
                    className="input"
                    type="text"
                    name="color"
                    placeholder="Enter colors"
                  />
                </div>
              </div>
              <div className="create__binex-button">
                <button className="user_user__button" type="submit">
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
