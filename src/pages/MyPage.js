//마이페이지(주문내역조회) 해나가 작업할 부분!!!
import React from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import "./MyPage.css";

const MyPage = () => {
  return (
    <div className="mypage">
      <div className="contentWrapper">
        <Nav />
        <div>
          <h3> 마이 페이지입니다.</h3>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyPage;
