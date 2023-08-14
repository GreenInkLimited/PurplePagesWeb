import React, { useRef } from "react";
import Autor from "../../assets/Autor2.png";
import AppNavbar from "../AppNavBar";

const WriteBlog = () => {
  const form = useRef();
  return (
    <>
      <AppNavbar />
      <div className="container">
        <div className="write-blog__title">
          <div className="write-blog__author">
            <img src={Autor} />
            <p>Charlie’s Bagel Garden</p>
          </div>
        </div>
        <div className="write-blog__container">
          <div className="write-blog__wrapper">
            <form ref={form}>
              <label className="write-blog__title__label">Title</label>
              <textarea
                className="textarea"
                name="message"
                placeholder="Share your thoughts and ideas..."
              />
              <label>Tags (required)</label>
              <input
                className="input"
                type="email"
                name="user_email"
                placeholder="Add up to 10 tags so people can find your post easily"
              />
              <div className="write-blog__submit">
                <button className="write-blog-promote">Promote blog</button>
                <button className="write-blog-publish">Publish post</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

export default WriteBlog;
