import React, {
 memo, useEffect, useState
} from "react";
import { useSelector} from "react-redux";
import ProductCard from "../ProductCard/ProductCard";

function AllProductItems() {

  const [pageNumber, setPageNumber] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [allProducts] = useSelector((state) => state.products);
  // eslint-disable-next-line no-shadow
  useEffect(() =>  {
    // eslint-disable-next-line no-shadow,,no-unused-vars
    let getPaginatedProducts = (() => {
      const startIndex = (pageNumber - 1) * 8;
      const endIndex = startIndex + 8;
      return allProducts.slice(startIndex, endIndex);
    });
    const newPaginatedProducts = getPaginatedProducts();
    setPaginatedProducts([...paginatedProducts, ...newPaginatedProducts]);
  }, [pageNumber, allProducts]);


    useEffect(() => {
      // eslint-disable-next-line no-use-before-define
      document.addEventListener("scroll", handleScroll);
      return () => {
        // eslint-disable-next-line no-use-before-define
        document.removeEventListener("scroll", handleScroll);
      };
    }, []);
  const handleScroll = (e) => {
    if (
      e.target.documentElement.scrollHeight - (window.innerHeight + e.target.documentElement.scrollTop) < 100) {
      setPageNumber((prevState) => prevState + 1);
    }
  };

  return (
    <div className="allProduct__wrapper">
      <div className="container flex_container">
        <div className="allProduct__card">
          {paginatedProducts.map((e) => (
            // eslint-disable-next-line no-underscore-dangle
            <ProductCard active={pageNumber} item={e} key={e._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(AllProductItems);
