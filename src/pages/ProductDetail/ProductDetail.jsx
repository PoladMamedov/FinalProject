import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import useServer from "../../hooks/useServer";
import PreLoader from "../../components/PreLoader/PreLoader";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";

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
    color: "",
    basicProps: {
      brand: "",
      stock: 0,
      article: 0
    },
    props: {},
    similarProducts: {}
  });
  const [productAmount, setProductAmount] = useState(1);
  const [productColor, setProductColor] = useState("");

  const [mainImgUrl, setMainImgUrl] = useState("");
  const [isFullScreenImg, setIsFullScreenImg] = useState(false);

  const [sliderSettings, setSliderSettings] = useState({
    default: {
      className: "product-detail__carousel",
      dots: false,
      infinite: false,
      slidesToShow: 0,
      slidesToScroll: 1,
     responsive: [
        {
          breakpoint: 1200,
          settings: {
            vertical: true,
            verticalSwiping: true
          }
        },
        {
          breakpoint: 1023,
          settings: {
            vertical: false,
            verticalSwiping: false
          }
        }
      ]
    },
    fullSize: {
      dots: true,
      dotsClass: "product-detail__fs-carousel-dots",
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1
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
          name, description, imageUrls, quantity, currentPrice, previousPrice, similarProducts, properties: {color, brand, ...properties}
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
          props: {...productData.props, ...properties},
          similarProducts: { ...similarProducts, [itemNo]: color}
        });
        setIsLoaded(true);
        setProductColor(color);
        setSliderSettings({...sliderSettings, default: {...sliderSettings.default, slidesToShow: imageUrls.length > 4 ? 4 : imageUrls.length}});
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

  function onAdditionalImgClick(event) {
    setMainImgUrl(event.target.src);
  }

  function onMainImgClick() {
    setIsFullScreenImg(true);
    document.querySelector("body").style.overflow = "hidden";
  }

  function closeCarousel(event) {
    if (["product-detail__fs-carousel-wrap", "product-detail__fs-carousel-img-wrap", "product-detail__fs-carousel-dots"].some((el) => event.target.classList.contains(el))) {
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
  // TODO: Sync full size carousel with main img after closing & centered additional carousel

  return (
    <>
      <BreadCrumb/>
    <section className="container product-detail-section">
      <div className="product-detail__wrap">
        <div className="product-detail__images-block">
          <img className="product-detail__main-img" width="323px" height="222px" src={mainImgUrl} alt="main-img" onClick={onMainImgClick} />
            <Slider {...sliderSettings.default}>{productData.imageUrls.map((el, index) => <div key={index} className="product-detail__carousel-img-wrap"><img className="product-detail__carousel-img" src={el} alt="img" onClick={onAdditionalImgClick}/></div>)}</Slider>
        </div>
        <div className="product-detail__info-wrap">
          <div className="product-detail__info-block">
            <h2 className="product-detail__name">{productData.name}</h2>
            <p className="product-detail__description">{productData.description}</p>
            <a href="#techSpecs" className="product-detail__specs-link" onClick={onAnchorLinkClick}>See Tech Specs...</a>
            <div className={productData.sale ? "product-detail__basic-specs-wrap" : "product-detail__basic-specs-wrap--flex-start"}>
              <div className="product-detail__basic-specs">
                {Object.entries(productData.basicProps).map(([key, value], index) => <p key={index} className={`product-detail__basic-spec product-detail__${key}`}>{key}: <span className="product-detail__basic-spec-value">{value}</span></p>)}
              </div>
              {productData.sale ? <div className="product-detail__price-wrap">{Object.entries(productData.price).map(([key, value], index) => <p key={index} className={`product-detail__price-${key === "currentPrice" ? "current" : "previous"}`}>{value}$</p>)}</div> : <p className="product-detail__basic-spec">Price: <span className="product-detail__basic-spec-value">{productData.price.currentPrice}$</span></p>}
            </div>
            <div className="product-detail__color-wrap">
              <p className="product-detail__basic-spec">Color: <span className="product-detail__basic-spec-value">{productColor}</span></p>
              <div className="product-detail__color-list">
                 {/* {productData.color.map((el, index) => <span onClick={(e) => setProductColor(e.target.style.backgroundColor)} key={index} className={`product-detail__color-list-item ${productColor === el ? "product-detail__color-list-item--active" : ""}`} style={{backgroundColor: el}}></span>)} */}
                 {Object.entries(productData.similarProducts).map(([key, value], index) => <Link to={`/products/${key}`}><span key={index} className={`product-detail__color-list-item ${productColor === value ? "product-detail__color-list-item--active" : ""}`} style={{backgroundColor: value}}></span></Link>)}
              </div>
            </div>
          </div>
          <div className="product-detail__cart-block">
            <div className="cart-block__quantity-wrap">
              <button type="button" className="cart-block__quantity-item cart-block__decrease-btn" onClick={onDecreaseBtnClick}>-</button>
              <input type="text" className="cart-block__quantity-item cart-block__quantity-input" value={productAmount} onChange={onProductAmountChange} ref={inputProductAmountRef} onBlur={onProductAmountBlur} onKeyDown={onProductAmountKeyDown}/>
              <button type="button" className="cart-block__quantity-item cart-block__increase-btn" onClick={onIncreaseBtnClick}>+</button>
            </div>
            <button type="button" className="cart-block__add-btn">Add to cart</button>
          </div>
        </div>
      </div>
      <div className="product-detail__specs-block" id="techSpecs">
        <h3 className="product-detail__specs-title">Specifications</h3>
        <table className="product-detail__specs-table">
          <tbody className="product-detail__specs-list">
          {Object.entries(productData.props).map(([key, value], index) => <tr key={index} className="product-detail__specs-item"><td className="product-detail__specs-data">{key}:</td><td className="product-detail__specs-data product-detail__specs-data--value">{value.toString()}</td></tr>)}
          </tbody>
        </table>
      </div>
      {isFullScreenImg && <div className="product-detail__fs-carousel-wrap" onClick={closeCarousel}>
        <button type="button" className="product-detail__fs-carousel-close-btn" onClick={() => setIsFullScreenImg(false)}>x</button>
        <Slider {...sliderSettings.fullSize} className="product-detail__fs-carousel">
           {productData.imageUrls.map((el, index) => <div key={index} className="product-detail__fs-carousel-img-wrap"><img className="product-detail__fs-carousel-img" src={el} alt="img"/></div>)}
        </Slider>
      </div>}
    </section>
    </>
  );
}
