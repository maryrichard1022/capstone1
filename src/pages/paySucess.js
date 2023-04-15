import React from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import CustomButton from "../components/CustomButton";
import { Link } from "react-router-dom";
import "./PaySucess.css";

const PaySucess = () => {
  return (
    <div>
      <Nav />
      <div className="PayCheck">
        <div className="PayCheckAlert">
          <img alt="check" src={require("../assets/Paycheck.png")} />
          <h3> 주문이 완료되었습니다.</h3>
        </div>
        <br />

        <div className="PayCheckInfo">
          <p>주문번호: {new Date().getTime()}</p>
          <p>주문일자: {new Date().getTime()}</p>
        </div>
        <br />
        <div className="PayCheckButton">
          <Link to={"/MyPage"}>
            <CustomButton text={"주문내역확인"} />
          </Link>

          <Link to={"/"}>
            <CustomButton text={"홈으로"} />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaySucess;
