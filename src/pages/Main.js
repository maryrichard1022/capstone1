//메인 홈페이지
import React from "react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import MainSlider from "../components/MainSlider";
import MainPageProduct from "../components/MainPageProduct";

import "./Main.css";
// https://jsonplaceholder.typicode.com/photos

function Main() {
  return (
    <div className="main">
      <Nav />
      <MainSlider />
      <MainPageProduct />
      <Footer />
    </div>
  );
}

export default Main;
