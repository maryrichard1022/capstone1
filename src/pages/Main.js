//메인 홈페이지
import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import MainSlider from "../components/MainSlider";
import MainPageProduct from "../components/MainPageProduct";
import "./Main.css";

function Main() {
  return (
    <div className="main">
      <div className="contentWrapper">
        <Nav />
        <MainSlider />
        <MainPageProduct />
      </div>
      <Footer />
    </div>
  );
}

export default Main;
