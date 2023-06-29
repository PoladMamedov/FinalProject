import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useServer from "../../hooks/useServer";
import PreLoader from "../../components/PreLoader/PreLoader";
import Carousel from "../../components/Carousel/Carousel";

export default function ProductDetail() {
  const [isLoaded, setIsLoaded] = useState(false);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    imageUrls: [],
    price: {
      currentPrice: 0,
      previousPrice: 0,
    },
    sale: false,
    color: [],
    basicProps: {
      brand: "",
      stock: 0,
      article: 0
    },
    props: {},
  });
  const [productAmount, setProductAmount] = useState(1);
  const [productColor, setProductColor] = useState("");

  const [mainImgUrl, setMainImgUrl] = useState("");
  const [isFullScreenImg, setIsFullScreenImg] = useState(false);

  const [carouselConfig, setCarouselConfig] = useState({
    basic: {
      currentStartItemIndex: 0,
      visibleItemCount: 3,
      items: [],
      justifyContentStart: false,
      fullSize: false
    },
    fullSize: {
      currentStartItemIndex: 0,
      visibleItemCount: 1,
      items: [],
      justifyContentStart: false,
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
        const {
          name, description, imageUrls, quantity, currentPrice, previousPrice, properties: {color, brand, ...properties}
        } = await getProduct(itemNo);
        setProductData({
          ...productData,
          name,
          description,
          imageUrls,
          price: {
            ...productData.price,
            currentPrice,
            previousPrice,
          },
          sale: currentPrice < previousPrice,
          color,
          basicProps: {
            ...productData.basicProps,
            stock: quantity,
            article: itemNo,
            brand
          },
          props: {...productData.props, ...properties}
        });
        setIsLoaded(true);
        setProductColor(color[0]);
        setCarouselConfig({
          ...carouselConfig,
          basic: {
            ...carouselConfig.basic,
            items: imageUrls,
            visibleItemCount: imageUrls.length > 3 ? 4 : carouselConfig.basic.visibleItemCount,
            justifyContentStart: imageUrls.length < 3,
          },
          fullSize: {
            ...carouselConfig.fullSize,
            items: imageUrls
          }
        });
        setMainImgUrl(imageUrls[0]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProduct();
  }, [itemNo]);

  function onIncreaseBtnClick() {
    if (inputProductAmountRef.current.value < productData.basicProps.stock) {
      setProductAmount(+inputProductAmountRef.current.value + 1);
    }
  }
  function onDecreaseBtnClick() {
    if (inputProductAmountRef.current.value > 1) {
      setProductAmount(inputProductAmountRef.current.value - 1);
    }
  }

  function isValidProductAmount(amount) {
    return /^[0-9]*$/.test(amount) && amount > 0 && amount <= productData.basicProps.stock;
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
    document.querySelector("body").style.overflow = "hidden";
  }

  function onCloseCarousel(event) {
    if (["IMG", "BUTTON"].every((el) => el !== event.target.tagName)) {
      setIsFullScreenImg(false);
      document.querySelector("body").style.overflow = "";
    }
  }

  function onAnchorLinkClick(event) {
    event.preventDefault();
    const targetElement = document.querySelector(`#${event.target.href.split("#")[1]}`);
      targetElement.scrollIntoView({ behavior: "smooth" });
  }

  if (!isLoaded) return <PreLoader/>;

  return (
    <>
    <section className="container product-detail-section">
      <img className="product-detail__main-img" width="323px" height="222px" src={mainImgUrl} alt="main-img" onClick={onMainImgClick} />
      <Carousel className="product-detail__carousel" {...carouselConfig.basic} onArrowClick={() => onArrowClick} onItemClick={() => onAdditionalImgClick} onCloseCarousel={() => onCloseCarousel}/>
      <div className="product-detail__info-block">
        <h2 className="product-detail__name">{productData.name}</h2>
        <p className="product-detail__description">{productData.description}</p>
        <a href="#techSpecs" className="product-detail__characteristics-link" onClick={onAnchorLinkClick}>See Tech Specs...</a>
        <div className={productData.sale ? "product-detail__info-wrap" : "product-detail__info-wrap--flex-start"}>
          <div className="product-detail__basic-characteristics">
            {Object.entries(productData.basicProps).map(([key, value], index) => <p key={index} className={`product-detail__basic-characteristic product-detail__${key}`}>{key}: <span className="product-detail__basic-characteristic-value">{value}</span></p>)}
          </div>
          {productData.sale ? <div className="product-detail__price-wrap">{Object.entries(productData.price).map(([key, value], index) => <p key={index} className={`product-detail__price-${key === "currentPrice" ? "current" : "previous"}`}>{value}$</p>)}</div> : <p className="product-detail__basic-characteristic">Price: <span className="product-detail__basic-characteristic-value">{productData.price.currentPrice}$</span></p>}
        </div>
        <div className="product-detail__color-wrap">
          <p className="product-detail__basic-characteristic">Color: <span className="product-detail__basic-characteristic-value">{productColor}</span></p>
          <div className="product-detail__color-list">
            {productData.color.map((el, index) => <span onClick={(e) => setProductColor(e.target.style.backgroundColor)} key={index} className={`product-detail__color-list-item ${productColor === el ? "product-detail__color-list-item--active" : ""}`} style={{backgroundColor: el}}></span>)}
          </div>
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
      <div className="product-detail__characteristic-block" id="techSpecs">
        <h3 className="product-detail__characteristics-title">Specifications</h3>
        <table className="product-detail__characteristics-table">
          <tbody className="product-detail__characteristic-list">
          {Object.entries(productData.props).map(([key, value], index) => <tr key={index} className="product-detail__characteristic-item"><td className="product-detail__characteristic-data">{key}:</td><td className="product-detail__characteristic-data product-detail__characteristic-data--value">{value.toString()}</td></tr>)}
          </tbody>
        </table>
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
