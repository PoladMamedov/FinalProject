import "../../styles/style.scss";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useServer from "../../hooks/useServer";
import PreLoader from "../../components/PreLoader/PreLoader";
import Carousel from "../../components/carousel/carousel";

// const mockData = {
//   name: "Razer Mouse X89",
//   imgs: ["https://images.unsplash.com/photo-1616296425622-4560a2ad83de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=713&q=80", "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80", "https://images.unsplash.com/photo-1616296425622-4560a2ad83de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=713&q=80", "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80", "https://images.unsplash.com/photo-1621068403583-19332ce20219?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80", "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80", "https://images.unsplash.com/photo-1621068403583-19332ce20219?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"],
//   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nibh erat",
//   brand: "Teknology",
//   stock: 5,
//   price: 55
// };

export default function ProductDetail() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [productData, setProductData] = useState({});
  const [productAmount, setProductAmount] = useState(1);

  const [mainImgUrl, setMainImgUrl] = useState("");
  const [isFullScreenImg, setIsFullScreenImg] = useState(false);

  const [carouselConfig, setCarouselConfig] = useState({
    basic: {
      currentStartItemIndex: 0,
      visibleItemCount: 3,
      items: [],
      flexStart: false,
      fullSize: false
    },
    fullSize: {
      currentStartItemIndex: 0,
      visibleItemCount: 1,
      items: [],
      flexStart: false,
      fullSize: true
    }

  });

  const { itemNo } = useParams();
  const {getProduct} = useServer();
  const inputProductAmountRef = useRef(null);

  useEffect(() => {
    setIsLoaded(false);
    async function fetchProduct() {
      try {
        const data = await getProduct(itemNo);
        setProductData(data);
        setIsLoaded(true);
        setCarouselConfig({
          ...carouselConfig,
          basic: {
            ...carouselConfig.basic,
            items: data.imageUrls,
            // items: mockData.imgs,
            visibleItemCount: data.imageUrls.length > 6 ? 4 : carouselConfig.basic.visibleItemCount,
            flexStart: data.imageUrls.length < 3,
            // flexStart: mockData.imgs.length < 3,
          },
          fullSize: {
            ...carouselConfig.fullSize,
            items: data.imageUrls
            // items: mockData.imgs
          }
        });
        setMainImgUrl(data.imageUrls[0]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProduct();
  }, [itemNo]);

  function onIncreaseBtnClick() {
    if (inputProductAmountRef.current.value < productData.quantity) {
      setProductAmount(+inputProductAmountRef.current.value + 1);
    }
  }
  function onDecreaseBtnClick() {
    if (inputProductAmountRef.current.value > 1) {
      setProductAmount(inputProductAmountRef.current.value - 1);
    }
  }

  function isValidProductAmount(amount) {
    return /^[0-9]*$/.test(amount) && amount > 0 && amount <= productData.quantity;
  }

  function onProductAmountChange(event) {
    if (event.target.value === "") {
      setProductAmount(event.target.value);
    } else if (isValidProductAmount(event.target.value)) {
      setProductAmount(+event.target.value);
    }
  }
  function onProductAmountBlur(event) {
    if (event.target.value === "") {
      inputProductAmountRef.current.focus();
    }
  }

  function onProductAmountKeyDown(event) {
    if ([69, 187, 189, 190].includes(event.keyCode)) {
      event.preventDefault();
    }
    if (event.keyCode === 38) {
      event.preventDefault();
      onIncreaseBtnClick();
    }
    if (event.keyCode === 40) {
       event.preventDefault();
      onDecreaseBtnClick();
    }
  }

  function onArrowClick(event) {
    let configStructure = "basic";
    if (event.target.className.includes("full-size")) {
      configStructure = "fullSize";
    }

    // if (event.target.className.includes("right-arrow") && carouselConfig[configStructure].currentStartItemIndex < mockData.imgs.length - carouselConfig[configStructure].visibleItemCount) {
    if (event.target.className.includes("right-arrow") && carouselConfig[configStructure].currentStartItemIndex < productData.imageUrls.length - carouselConfig[configStructure].visibleItemCount) {
      setCarouselConfig({
        ...carouselConfig,
        [configStructure]: {
          ...carouselConfig[configStructure],
          currentStartItemIndex: carouselConfig[configStructure].currentStartItemIndex + 1
        }
      });
    } else if (event.target.className.includes("left-arrow") && carouselConfig[configStructure].currentStartItemIndex > 0) {
      setCarouselConfig({
        ...carouselConfig,
        [configStructure]: {
          ...carouselConfig[configStructure],
          currentStartItemIndex: carouselConfig[configStructure].currentStartItemIndex - 1
        }
      });
    }
  }

  function onAdditionalImgClick(event) {
    setMainImgUrl(event.target.src);
  }

  function onMainImgClick() {
    setIsFullScreenImg(true);
    setCarouselConfig({...carouselConfig, fullSize: {...carouselConfig.fullSize, currentStartItemIndex: productData.imageUrls.findIndex((el) => mainImgUrl.includes(el))}});
    // setCarouselConfig({...carouselConfig, fullSize: {...carouselConfig.fullSize, currentStartItemIndex: mockData.imgs.findIndex((el) => el === mainImgUrl)}});
  }

  function onCloseCarousel(event) {
    if (["IMG", "BUTTON"].every((el) => el !== event.target.tagName)) setIsFullScreenImg(false);
  }

  if (!isLoaded) return <PreLoader/>;

  return (
    <>
    <section className="container product-detail-section">
      <img className="product-detail__main-img" width="323px" height="222px" src={mainImgUrl} alt="main-img" onClick={onMainImgClick} />
      <Carousel {...carouselConfig.basic} onArrowClick={() => onArrowClick} onItemClick={() => onAdditionalImgClick} onCloseCarousel={() => onCloseCarousel}/>
      <div className="product-detail__info-block">
        <h2 className="product-detail__name">{productData.name}</h2>
        <p className="product-detail__description">{productData.description}</p>
        <div className="product-detail__items">
          {/* TODO: rewrite with map or other method to avoid duplication */}
          <p className="product-detail__item product-detail__brand">Brand: <span className="product-detail__item-value">{productData.brand}</span></p>
          <p className="product-detail__item product-detail__stock">Stock: <span className="product-detail__item-value">{productData.quantity}</span></p>
          <p className="product-detail__item product-detail__price">Price: <span className="product-detail__item-value">{productData.currentPrice}$</span></p>
          <p className="product-detail__item product-detail__color">Color: <span className="product-detail__item-value">{productData.color}</span></p>
        </div>
      </div>
      <div className="product-detail__cart-block">
        <div className="cart-block__amount-wrap">
          <button type="button" className="cart-block__amount-item cart-block__decrease-btn" onClick={onDecreaseBtnClick}>-</button>
          <input type="text" className="cart-block__amount-item cart-block__amount-input" value={productAmount} onChange={onProductAmountChange} ref={inputProductAmountRef} onBlur={onProductAmountBlur} onKeyDown={onProductAmountKeyDown}/>
          <button type="button" className="cart-block__amount-item cart-block__increase-btn" onClick={onIncreaseBtnClick}>+</button>
        </div>
        <button type="button" className="cart-block__add-btn">Add to cart</button>
      </div>
    </section>
      {isFullScreenImg && <Carousel
        {...carouselConfig.fullSize}
        onArrowClick={() => onArrowClick}
        onItemClick={() => {}}
        onCloseCarousel={() => onCloseCarousel}/>}
    </>
  );
}
