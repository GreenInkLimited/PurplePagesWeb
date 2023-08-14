import React from "react";
import AppNavbar from "../../components/AppNavBar";
import SingleProduct from "../../components/App/SingleProduct";
import "./apphome.css";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <>
      <AppNavbar />
      <SingleProduct />
      <Footer />
    </>
  );
};

export default Home;
