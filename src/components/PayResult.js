import React from "react";
import axios from "axios";

class PayResult extends React.Component {
  constructor(props) {
    super(props);
    const { params } = this.state;
    const {
      location: { search },
    } = props;

    // url에 붙어서 온 pg_token을 결제 API에 줄 params에 할당
    params.pg_token = search.split("=")[1];
  }

  state = {
    params: {
      cid: "TC0ONETIME",
      // localstorage에서 tid값을 읽어온다.
      tid: window.localStorage.getItem("tid"),
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      pg_token: "",
    },
  };

  componentDidMount() {
    const { params } = this.state;

    axios({
      //단건 결제 승인
      url: "https://kapi.kakao.com/v1/payment/approve",
      Host: "kapi.kakao.com",
      method: "POST",
      headers: {
        Authorization: "KakaoAK b510676c6e0cafb78941741fc4df73e4",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params,
    }).then((response) => {
      // 결제 승인에 대한 응답 출력
      console.log(response);
    });
  }

  render() {
    return (
      <div>
        <h2>Result page</h2>
      </div>
    );
  }
}
export default PayResult;
