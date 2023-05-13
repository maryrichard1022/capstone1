// 장바구니
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import "./Cart.css";
import { Link } from "react-router-dom";
import API from "../config";
import CustomButton from "../components/CustomButton";
import CartProduct from "../components/CartProduct";

const Cart = () => {
  //로그인한 유저의 토큰을 확인
  const access_token = sessionStorage.getItem("access_token");
  const navigate = useNavigate();

  const [pending, setPending] = useState(false);
  //const [Modal, setModal] = useState(false);
  //물품 수량 업데이트 상태
  const [items, setItems] = useState([]);
  //총 상품 가격 (reduce 배열 순회, 값 누적하여 하나의 값으로 반환)
  const totalPrice = items.reduce((previousValue, currentValue) => {
    return (
      parseInt(previousValue) +
      parseInt(currentValue.price * currentValue.quantity)
    );
  }, 0);

  // const openModal = () => {
  //  setModal(true);
  //  setTimeout(() => {
  //    navigate("/myorder");
  // }, 2000);
  // };

  // 로그인 되어 있으면 -> 장바구니 목록 가져옴
  const getItems = async () => {
    const response = await fetch(API.cart, {
      headers: {
        Authorization: access_token,
      },
    });
    const result = await response.json();
    setItems(result.cart);
  };

  //아이템 수량 -1
  const handleDecreaseItem = async (id) => {
    const selectedId = items.findIndex((item) => item.id === id);
    //수량 1보다 크고 pending true이면 수량 조절
    if (items[selectedId].quantity > 1 && !pending) {
      //pending -> true로 바꿈 (토글)
      setPending(true);
      const response = await fetch(API.cart, {
        method: "PATCH",
        headers: {
          Authorization: access_token,
        },
        body: JSON.stringify({
          cart_id: items[selectedId].id,
          quantity: -1,
        }),
      });
      const result = await response.json();

      setPending(false);
      if (result.message === "UPDATE_SUCCESS") {
        // 아이템 가져오고
        const newQuantity = [...items];
        //해당 id 수량 조절
        newQuantity[selectedId].quantity--;
        // 변경사항 반영
        setItems(newQuantity);
      }
    }
  };
  //아이템 수량 +1
  const handleIncreaseItem = async (id) => {
    const selectedId = items.findIndex((item) => item.id === id);
    //현재 pending: false
    if (!pending) {
      setPending(true);
      const response = await fetch(API.cart, {
        method: "PATCH",
        headers: {
          Authorization: access_token,
        },
        body: JSON.stringify({
          cart_id: items[selectedId].id,
          quantity: 1,
        }),
      });
      const result = await response.json();
      setPending(false);

      if (result.message === "UPDATE_SUCCESS") {
        //해당 물품 id 찾아서 수량 증가
        const newQuantity = [...items];
        newQuantity[selectedId].quantity++;
        setItems(newQuantity);
      }
    }
  };

  //아이템 삭제
  const handleRemoveItem = async (id) => {
    const selectedId = items.findIndex((item) => item.id === id);
    // 현재 pending : false
    if (!pending) {
      setPending(true);
      const response = await fetch(API.cart, {
        method: "DELETE",
        headers: {
          Authorization: access_token,
        },
        body: JSON.stringify({
          cart_id: [items[selectedId].id],
        }),
      });
      const result = await response.json();
      setPending(false);
      if (result.message === "DELETE_SUCCESS") {
        // 해당 아이템의 id 찾아서 삭제
        const filtered = items.filter((itme) => itme.id !== id);
        setItems(filtered);
      }
    }
  };
  //로그인 안 되어 있으면 로그인 창으로
  useEffect(() => {
    if (!access_token) {
      alert("로그인 해주세요.");
      navigate("/Login");
      return;
    }
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="cart">
      <div className="contentWrapper">
        <Nav />
        <h1> 장바구니 </h1>
        <div className="CartInfo">
          <div className="ProductInCart">
            <hr></hr>
            <div className="ProductInCartInfo">
              {/* <input type="checkbox" /> */}
              <span>전체선택</span>
              <span>상품명</span>
              <span>수량</span>
              <span>상품금액</span>
            </div>

            <div className="ProductDetail">
              {/* <input type="checkbox" /> */}
            </div>
            <div className="cart-items">
              {/* 물품정보 props 전달 */}
              {items.map((item, index) => (
                <CartProduct
                  // key={Math.random()}
                  item={item}
                  index={index}
                  handleDecreaseItem={handleDecreaseItem}
                  handleIncreaseItem={handleIncreaseItem}
                  handleRemoveItem={handleRemoveItem}
                />
              ))}
            </div>
            <hr></hr>
          </div>
        </div>
        {/* 총 가격 가격 */}
        <div className="TotalPrice">
          <h2>총 결제 금액 : {totalPrice.toLocaleString()} 원</h2>
          <Link to={"/Payment"}>
            <CustomButton text={"주문하기"} />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
