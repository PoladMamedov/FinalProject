import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useServer from "../../hooks/useServer";
import PreLoader from "../../components/PreLoader/PreLoader";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import Gallery from "./components/Gallery";
import Specifications from "./components/Specifications";
import OrderActions from "./components/OrderActions";
import Description from "./components/Description";

export default function ProductDetail() {
  const [isLoaded, setIsLoaded] = useState(false);
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

  if (!isLoaded) return <PreLoader/>;

  return (
    <>
      <BreadCrumb/>
    <section className="container product-detail-section">
      <div className="product-detail__wrap">
        <Gallery {...productData}/>
        <div className="product-detail__info-wrap">
          <Description {...productData}/>
          <OrderActions {...productData}/>
        </div>
      </div>
       <Specifications {...productData}/>
    </section>
    </>
  );
}
