import "../../styles/style.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useServer from "../../hooks/useServer";
import PreLoader from "../../components/PreLoader/PreLoader";
import Carousel from "../../components/carousel/carousel";

const mockData = {
  name: "Razer Mouse X89",
  imgs: ["https://images.unsplash.com/photo-1616296425622-4560a2ad83de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=713&q=80", "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80", "https://images.unsplash.com/photo-1616296425622-4560a2ad83de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=713&q=80", "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80", "https://images.unsplash.com/photo-1621068403583-19332ce20219?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80", "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80", "https://images.unsplash.com/photo-1621068403583-19332ce20219?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"],
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nibh erat",
  brand: "Teknology",
  stock: 5,
  price: 55
};

export default function ProductDetail() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [productAmount, setProductAmount] = useState(1);
  const [currentCarouselStart, setCurrentCarouselStart] = useState(0);
  const [productData, setProductData] = useState({});
  const [visibleItemCount, setVisibleItemCount] = useState(3);
  const [mainImgUrl, setMainImgUrl] = useState("");

  const { itemNo } = useParams();
  const {getProduct} = useServer();

  useEffect(() => {
    setIsLoaded(false);
    async function fetchProduct() {
      try {
        const data = await getProduct(itemNo);
        setProductData(data);
        setIsLoaded(true);
        if (data.imageUrls.length > 6) setVisibleItemCount(4);
        setMainImgUrl(data.imageUrls[0]);
        // if (mockData.imgs.length > 6) setVisibleItemCount(4);
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

  function onArrowClick(event) {
    if (event.target.classList.contains("carousel__right-arrow") && currentCarouselStart < productData.imageUrls.length - visibleItemCount) {
    // if (event.target.classList.contains("carousel__right-arrow") && currentCarouselStart < mockData.imgs.length - visibleItemCount) {
      setCurrentCarouselStart(currentCarouselStart + 1);
    } else if (event.target.classList.contains("carousel__left-arrow") && currentCarouselStart > 0) {
      setCurrentCarouselStart(currentCarouselStart - 1);
    }
  }

  function onImgClick(event) {
    setMainImgUrl(event.target.src);
  }

  if (!isLoaded) return <PreLoader/>;

  return (
    <section className="container product-detail-section">
      <img className="product-detail__main-img" width="323px" height="222px" src={mainImgUrl} alt="main-img" />
      <Carousel currentCarouselStart={currentCarouselStart} imageUrls={productData.imageUrls} visibleItemCount={4} onArrowClick={() => onArrowClick} onItemClick={() => onImgClick}/>
      {/* <Carousel currentCarouselStart={currentCarouselStart} imageUrls={mockData.imgs} visibleItemCount={4} onArrowClick={() => onArrowClick} onItemClick={() => onImgClick}/> */}
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
