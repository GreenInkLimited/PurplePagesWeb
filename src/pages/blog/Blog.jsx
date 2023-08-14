import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import AppNavBar from "../../components/AppNavBar";
import HomeBlogContent from "../../components/Blog/HomeBlogContent";
import BlogFilter from "../../components/App/BlogFliter";
import { getBlogs } from "../../apis/BlogApis";
import "./blog.css";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await getBlogs({ pageParam: 0 });
        const { blogs } = response;
        console.log(blogs[0].id, "first id beofre filterting ");
        setBlogs(blogs);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <AppNavBar />
      <BlogFilter setBlogs={setBlogs} blogs={blogs} />
      <HomeBlogContent blogs={blogs} />
      <Footer />
    </>
  );
};

export default Blog;
