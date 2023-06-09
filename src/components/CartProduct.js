//장바구니 물품 정보 띄움

import React from "react";
import "./CartProduct.css";

const CartProduct = ({
  item,
  handleDecreaseItem,
  handleIncreaseItem,
  handleRemoveItem,
}) => {
  const { cart_id, product_id, product_name, quantity, price, image_url } =
    item;

  return (
    <div className="cart-card-container">
      <div className="cart-item">
        <div className="cart-row-img-box">
          {/* 상품 사진, 이름, 수량증감, 상품 가격 */}
          <a
            href={"/Detail/?id=" + product_id}
            style={{ color: "black", textDecoration: "none" }}
          >
            <img className="cart-row-img" alt="item" src={image_url} />
          </a>
        </div>
        <a
          href={"/Detail/?id=" + product_id}
          style={{ color: "black", textDecoration: "none" }}
        >
          <div className="cart-info-name-box">
            <div className="cart-info-name">{product_name}</div>
          </div>
        </a>
        <span className="cart-info-count">
          <button
            className="counter"
            onClick={() => handleDecreaseItem(cart_id)}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="counter"
            onClick={() => handleIncreaseItem(cart_id)}
          >
            +
          </button>
        </span>

        <span className="cart-price">{`₩${(
          price * quantity
        ).toLocaleString()}`}</span>

        <span className="cart-remove-btn">
          <button className="counter" onClick={() => handleRemoveItem(cart_id)}>
            ✕
          </button>
        </span>
      </div>
    </div>
  );
};

export default CartProduct;
