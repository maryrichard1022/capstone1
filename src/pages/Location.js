import React from "react";
import Kakaomap from "../components/Kakaomap";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

import "./Location.css";
const Location = () => {
  return (
    <div className="location">
      <div className="contentWrapper">
        <Nav />
        <h2>매장 위치</h2>
        <Kakaomap />
      </div>
      <Footer />
    </div>
  );
};

export default Location;
