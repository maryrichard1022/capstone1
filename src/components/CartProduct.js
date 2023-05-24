//장바구니 물품 정보 띄움

import React from "react";
import "./CartProduct.css";

const CartProduct = ({
  item,
  handleDecreaseItem,
  handleIncreaseItem,
  handleRemoveItem,
}) => {
  const { id, product_name, quantity, price, image_url } = item;

  return (
    <div className="cart-card-container">
      <div className="cart-item">
        <div className="cart-row-img-box">
          {/* 상품 사진, 이름, 수량증감, 상품 가격 */}
          <img className="cart-row-img" alt="item" src={image_url} />
        </div>
        <div className="cart-info">
          <div>
            <div className="cart-info-name">{product_name}</div>
          </div>
          <div className="cart-handle-div">
            <div className="cart-info-price">
              <div className="cart-info-count">
                <button
                  className="counter"
                  onClick={() => handleDecreaseItem(id)}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className="counter"
                  onClick={() => handleIncreaseItem(id)}
                >
                  +
                </button>
              </div>
              <span className="cart-price">{`₩${(
                price * quantity
              ).toLocaleString()}`}</span>
            </div>

            <div className="cart-remove-btn">
              <button className="counter" onClick={() => handleRemoveItem(id)}>
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
