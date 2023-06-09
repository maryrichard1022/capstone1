import React, { useState, useEffect } from "react"; 
import { useNavigate, useLocation } from "react-router-dom"; 
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import "./Detail.css";
import DetailSlider from "../components/DetailSlider";
import API from "../config"; 

function Detail() {
  
  const [productlist, setProductlist] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let queryString = location.search;
    let params = new URLSearchParams(queryString);

    fetch(`${API.productDetail}/${params.get("id")}`)
      .then((res) => res.json())
      .then((result) => {
        setProductlist(result.result);
        console.log(result.result);
      });
  }, [location.search]);

  const handleAddToCart = () => {
    const kakao_id = sessionStorage.getItem("kakao_id");
    if (!kakao_id) {
      alert("로그인이 필요합니다.");
      navigate("/Login");
      return;
    }

    fetch(API.cart, {
      method: "POST",
      headers: {
        Authorization: kakao_id,
      },
      body: JSON.stringify({
        product_id: productlist.id,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.message);
        if (result.message === "CART_QUANTITY_CHANGED") {
          alert("장바구니에 수량 추가되었습니다.");
        } else if (result.message === "PUT_IN_CART_SUCCESS") {
          alert("장바구니에 상품 추가되었습니다.");
        }
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
        alert("장바구니에 상품을 추가할 수 없습니다.");
      });
  };

  return (
    <div className="all">
      <div className="contentWrapper">
        <Nav />

        <div class="product-detail">
          <div class="product-images">
            <div class="product-main-image">
              <DetailSlider imgs={productlist.image_url} />
            </div>
          </div>
          <div class="product-info">
            <div class="product-title">
              <h2>{productlist.name}</h2>
            </div>
            <div class="product-description">
              <p>{productlist.description}</p>
            </div>
            <div class="product-price">
              <h2>{Number(productlist.price).toLocaleString("ko-KR")}원</h2>
            </div>
            <button
              type="button"
              class="btn CustomButton"
              onClick={handleAddToCart}
            >
              장바구니 담기
            </button>
          </div>
        </div>

        <div class="container">
          <hr style={{ borderTop: "1px solid black" }} />
          <br />

          <div className="Row">
            <img src={productlist.content_url} alt="상세이미지" />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Detail;
