import "../../styles/style.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useServer from "../../hooks/useServer";
import PreLoader from "../../components/PreLoader/PreLoader";

// const mockData = {
//   name: "Razer Mouse X89",
//   imgs: ["https://images.unsplash.com/photo-1616296425622-4560a2ad83de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=713&q=80", "https://images.unsplash.com/photo-1621068403583-19332ce20219?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80", "https://images.unsplash.com/photo-1621068403583-19332ce20219?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80", "https://images.unsplash.com/photo-1621068403583-19332ce20219?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80", "https://images.unsplash.com/photo-1621068403583-19332ce20219?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"],
//   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nibh erat",
//   brand: "Teknology",
//   stock: 5,
//   price: 55
// };

export default function ProductDetail() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [productAmount, setProductAmount] = useState(1);
  const [productData, setProductData] = useState({});
  const { itemNo } = useParams();
  const {getProduct} = useServer();


  useEffect(() => {
    setIsLoaded(false);
    async function fetchProduct() {
      try {
        const data = await getProduct(itemNo);
        setProductData(data);
        setIsLoaded(true);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProduct();
  }, [itemNo]);

  function onIncreaseBtnClick() {
    if (productAmount < productData.quantity) {
      setProductAmount(productAmount + 1);
    }
  }
  function onDecreaseBtnClick() {
    if (productAmount > 1) {
      setProductAmount(productAmount - 1);
    }
  }

  if (!isLoaded) return <PreLoader/>;

  return (
    <section className="container product-detail-section">
      <img className="product-detail__main-img" width="323px" height="222px" src={`/${productData.imageUrls[0]}`} alt="main-img" />
      <div className="product-detail__additional-imgs">
        {productData.imageUrls.map((el, index) => <><img className="product-detail__img" width="66px" height="55px" src={`/${el}`} key={index} alt="img" /><img className="product-detail__img" width="66px" height="55px" src={`/${el}`} key={index} alt="img" /> </>)}
      </div>
      <div className="product-detail__info-block">
        <h2 className="product-detail__name">{productData.name}</h2>
        <p className="product-detail__description">{productData.description}</p>
        <p className="product-detail__item product-detail__brand">Brand: <span className="product-detail__item-value">{productData.brand}</span></p>
        <p className="product-detail__item product-detail__stock">Stock: <span className="product-detail__item-value">{productData.quantity}</span></p>
        <p className="product-detail__item product-detail__price">Price: <span className="product-detail__item-value">{productData.currentPrice}$</span></p>
      </div>
      <div className="product-detail__cart-block">
        <div className="cart-block__amount-wrap">
          <button type="button" className="cart-block__amount-item cart-block__decrease-btn" onClick={onDecreaseBtnClick}>-</button>
          <p className="cart-block__amount-item cart-block__amount">{productAmount}</p>
          <button type="button" className="cart-block__amount-item cart-block__increase-btn" onClick={onIncreaseBtnClick}>+</button>
        </div>
        <button type="button" className="cart-block__add-btn">Add to cart</button>
      </div>
    </section>
  );
}
