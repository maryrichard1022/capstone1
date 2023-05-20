import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
/* import "./DetailPage.css"; */
import FilterButton from "./FilterButton";
import API from "../config";
import CustomButton from "../components/CustomButton";

const DetailPage = () => {
    const [productlist, setProductlist] = useState([]);
    /* const [activeFilter1, setActiveFilter1] = useState([]);
    const [activeFilter2, setActiveFilter2] = useState([]); */
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const urlCategory = params.get("category"); 
    let subCategory = "";

    //버튼 누를 때마다 테이블 받아옴
  useEffect(() => {
    let queryString = location.search;

    /* if(queryString == "" || queryString.includes('category=supplements')){
      queryString="?category=supplements";
      setActiveFilter1('all')
    } else if (queryString.includes('sub_category=folate')) {
      setActiveFilter1('folate')
    } else if (queryString.includes('sub_category=ca')) {
      setActiveFilter1('ca')
    } else if (queryString.includes('sub_category=iron')) {
      setActiveFilter1('iron')
    } else if (queryString.includes('sub_category=lacto')) {
      setActiveFilter1('lacto')
    } else if (queryString.includes('sub_category=vitaminD')) {
      setActiveFilter1('vitaminD')
    } 
    
    if (queryString.includes('sort_method=price')) {
      setActiveFilter2('price')
    } else if (queryString.includes('sort_method=-price')) {
      setActiveFilter2('-price')
    } else if (queryString.includes('sort_method=id')) {
      setActiveFilter2('id')
    } else if (queryString.includes('sort_method=release_date')) {
      setActiveFilter2('release_date')
    } */

    //메인페이지에 띄우는 물품 리스트 정보 가져옴
    fetch(`${API.productDetail}${queryString}`) 
      .then((res) => res  .json())
      .then((result) => {
        //     setTotalItems(result);
        setProductlist(result.result);
        console.log(result);
      });
  }, [location.search]);

  //필터 버튼 누르면 url 바뀌도록
  /* const buyRightNow = () => {
    const rightnow = `?category=supplements`;
    navigate(rightnow);
  }; */

  const sortSuppleFolate = () => {
    const suppleFolate = `?sub_category=folate`;
    navigate(suppleFolate);
  };
  const sortSuppleCa = () => {
    const suppleCa = `?sub_category=ca`;
    navigate(suppleCa);
  };

  const sortSuppleIron = () => {
    const suppleIron = `?sub_category=iron`;
    navigate(suppleIron);
  };

  const sortSuppleLacto = () => {
    const suppleLacto = `?sub_category=lacto`;
    navigate(suppleLacto);
  };

  const sortSuppleVitaminD = () => {
    const suppleVitaminD = `?sub_category=vitaminD`;
    navigate(suppleVitaminD);
  };

  //필터 버튼 누르면 url 바뀌도록
/*   const sortPriceLow = () => {
    subCategory =  location.search;
    if(subCategory == "") {
      subCategory="?category=supplements";
    }
    const priceLow = `${subCategory}&sort_method=price`;
    navigate(priceLow);
  };

  const sortPriceHigh = () => {
    subCategory =  location.search;
    if(subCategory == "") {
      subCategory="?category=supplements";
    }
    const priceHigh = `${subCategory}&sort_method=-price`;
    navigate(priceHigh);
  };
  const sortBestProduct = () => {
    subCategory =  location.search;
    if(subCategory == "") {
      subCategory="?category=supplements";
    }
    const bestProduct = `${subCategory}&sort_method=id`;
    navigate(bestProduct);
  }; */

/*   const movePage = (num) => {
    let subCategory =  location.search;
    if(subCategory == "") {
      subCategory="?category=supplements";
    }
    const newPage = `${subCategory}&offset=${num}`;
    navigate(newPage);
  }; */

  /* const sortNewProduct = () => {
    subCategory =  location.search;
    if(subCategory == "") {
      subCategory="?category=supplements";
    }
    const newProduct = `${subCategory}&sort_method=release_date`;
    navigate(newProduct);
  }; */

  return (
    <div className="SupplementsPageProduct">
      {/* <div>
        <h1>영양제</h1>
          <img
          className="SupplementsBanner"
          alt="SupplememntsBanner"
          src={require("../assets/supplement.png")} /> */}

   {/*  <div className="SuppleFilterButton">
      <p>
          <FilterButton onClick={sortSuppleAll} text={"전체"} isActive={activeFilter1 === 'all'}/>
          <FilterButton onClick={sortSuppleFolate} text={"엽산"} isActive={activeFilter1 === 'folate'}/>
          <FilterButton onClick={sortSuppleCa} text={"칼슘"} isActive={activeFilter1 === 'ca'}/>
          <FilterButton onClick={sortSuppleIron} text={"철분"} isActive={activeFilter1 === 'iron'}/>
          <FilterButton onClick={sortSuppleLacto} text={"유산균"} isActive={activeFilter1 === 'lacto'}/>
          <FilterButton onClick={sortSuppleVitaminD} text={"비타민D"} isActive={activeFilter1 === 'vitaminD'}/>
      </p>
    </div> */}
        

        {/* <div className="AllFilterButton12">
          <FilterButton onClick={sortPriceLow} text={"가격 낮은 순" } isActive={activeFilter2 === 'price'}/>
          <FilterButton onClick={sortPriceHigh} text={"가격 높은 순"} isActive={activeFilter2 === '-price'}/>
          <FilterButton onClick={sortBestProduct} text={"베스트 순"} isActive={activeFilter2 === 'id'}/>
          <FilterButton onClick={sortNewProduct} text={"최신 순"} isActive={activeFilter2 === 'release_date'}/>
        </div> */}
    {/* </div> */}
      
        <br />

        <div className="ProductDetailInfo">
        {productlist?.map((product) => (
          <div className="DetailProduct">
            
            <img
              alt="product-img"
              /* src={require("../assets/url_img.png")} */
              src={product.image_url} //크롤링 테이블 받아왔을 때!!
              className="product-img"
            ></img>
            <div className="productinfo-cart">
              <div className="productinfo">
                {/* <p> {product.id}</p> */}
                <p className="product-name">{product.name}</p>
                <p className="product-price">{Math.floor(product.price)}원</p>
                {/* <p className="product-sold">sold: {product.sold}</p> */}
              </div>
              <div className="cart-img-box">
                <a href="/Cart">{/* 장바구니 아이콘 누르면 페이지 이동 */}
                 {/*  <img
                    alt="cart"
                    src={require("../assets/cart.png")}
                    className="cart-img"
                  ></img> */}
                  <button
                    type="button"
                    class="btn"
                    // btn-outline-dark btn-lg btn-block
    >
                    <CustomButton text={"장바구니 담기"}/>
                    </button>
                </a>

              </div>
            </div>
            <br />
          </div>
        ))}
      </div>
      {/* <div className="paginataion-group">
        <div className="pagination">
          <a href="#">&laquo;</a>
          <a onClick={() => movePage(0)}>1</a>
          <a onClick={() => movePage(8)} className="active">2</a>
          <a onClick={() => movePage(16)}>3</a>
          <a href="#">&raquo;</a>
        </div>
      </div> */}
    </div>
  );
};
export default DetailPage;