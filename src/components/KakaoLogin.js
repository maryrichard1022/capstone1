//카카오 로그인
import React from "react";

import "./KakaoLogin.css";
import API from "../config";

class KakaoLogin extends React.Component {
  state = {
    loginResult: false, // 로그인 여부에 따라 페이지 편집
  };

  componentDidMount() {
    //scope: 수집할 사용자 정보
    const scope = "profile_nickname";
    const home = this;
    let loginResult = false;
    // Kakao.Auth.login는 인증에 성공하면 success call back이 실행된다.
    window.Kakao.Auth.login(
      {
        scope,
        // success--> response로 응답 정보 받음
        success: function (response) {
          //카카오 SDK에 사용자 토큰 설정
          window.Kakao.Auth.setAccessToken(response.access_token);
          console.log(`is set?: ${window.Kakao.Auth.getAccessToken()}`);
          const id_token = `${window.Kakao.Auth.getAccessToken()}`;

          //임시로 작성 (토큰으로 로그인 됐다 치고 api 확인하기 위해)
          if (id_token) {
            sessionStorage.setItem("access_token", id_token);
          }

          //받아온 인가코드 백에 전달 --> 다시 GET 토큰
          fetch(`${API.signin}`, {
            method: "POST",
            body: JSON.stringify({
              access_token: id_token,
            }),
          })
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              if (id_token) {
                sessionStorage.setItem("access_token", id_token);
              }
            });
          loginResult = true;
          // 성공 사항에 따라 페이지를 수정하기 위한 setState
          home.setState({ loginResult });
        },
        fail: function (error) {
          console.log(error);
        },
      },
      []
    );
  }
  render() {
    const jsKey = "c810cdd4c87858ed473a517cefa5e349";

    // SDK 한번만 초기화 중복 초기화 막기 위해 isInitialized()로 초기화 여부 판단
    if (!window.Kakao.isInitialized()) {
      // JavaScript key를 인자로 주고 SDK 초기화
      window.Kakao.init(jsKey);
      // SDK 초기화 여부를 확인
      console.log(window.Kakao.isInitialized());
    }
    return (
      <div className="GotoKakaoLogin">
        <img alt="login" src={require("../assets/kakao_login.png")} />
      </div>
    );
  }
}
export default KakaoLogin;
