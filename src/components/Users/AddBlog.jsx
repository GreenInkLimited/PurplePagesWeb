import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { MdClear } from "react-icons/md";
import { RiImageAddLine } from "react-icons/ri";
import { WriteBlog } from "../../apis/BusinessApi";
import { useMutation, useQueryClient } from "react-query";

const AddBlog = ({ onCancel, businessId }) => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No File Selected");
  const [previewURL, setPreviewURL] = useState(null);
  const queryClient = useQueryClient();

  const handleCancel = () => {
    onCancel();
  };

  const { mutateAsync, isLoading } = useMutation("add blog", WriteBlog, {
    onSuccess: () => {
      handleCancel();
      queryClient.invalidateQueries("business");
    },
    onError: (error) => {
      console.error("Failed to add blog:", error);
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
    title: "",
    detail: "", // Set to an empty string
    tags: "",
    image: "",
    business_id: businessId,
  };

  const handleSubmit = (values) => {
    const updatedValues = {
      ...values,
      business_id: businessId,
      image: image,
      detail: values.detail.replace(/\n/g, "<br>"),
    };
    mutateAsync(updatedValues);
  };

  return (
    <div className="container">
      <div className="create__business-container">
        <div className="create__business-header">
          <MdClear onClick={handleCancel} />
          <div className="create__business-detail">
            <h4>Add Blog</h4>
          </div>
        </div>
        <div className="create__business-body">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (
              <Form>
                <Field
                  name="title"
                  type="text"
                  className="write-blog__title__label"
                  placeholder="Title..."
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
                    <RiImageAddLine color="#EBB8FC" />
                  )}
                </div>
                <small>
                  Your image should be in JPEG or PNG format and video in mp4
                </small>

                <label>Content</label>
                <ReactQuill
                  className="rich-text-editor"
                  value={values.detail}
                  onChange={(content) => setFieldValue("detail", content)}
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image", "video"],
                      ["clean"],
                    ],
                  }}
                  formats={[
                    "header",
                    "font",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "link",
                    "image",
                    "video",
                  ]}
                  placeholder="Enter caption"
                />

                <label>Tags</label>
                <Field
                  className="input"
                  type="text"
                  name="tags"
                  placeholder="Enter product title"
                />

                <button className="user_user__button" type="submit">
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
