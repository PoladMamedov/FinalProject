import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import fillProducts from "../../redux/actions/getProdicts";

function AllProductItems() {
  const [pageNumber, setPageNumber] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [allProductState] = useState(useSelector((state) => state.filteredProducts.filteredProducts));
  const allProducts = useSelector((state) => state.filteredProducts.filteredProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fillProducts(allProductState))
    }
  }, [allProducts]);
  const [sortChanged, setSortChanged] = useState(false);
  useEffect(() => {
    setSortChanged(true); // Установка значения true при сортировке в редаксе
  }, [allProducts]);

  useEffect(() => {
    if (sortChanged) {
      setSortChanged(false); // Сброс значения после перерендера
    }
  }, [sortChanged]);

  useEffect(() => {
    setPaginatedProducts([]);
    setPageNumber(1);
  }, [allProducts]);

  useEffect(() => {
    let getPaginatedProducts = () => {
      const startIndex = (pageNumber - 1) * 8;
      const endIndex = startIndex + 8;
      return allProducts.slice(startIndex, endIndex);
    };

    const newPaginatedProducts = getPaginatedProducts();
    setPaginatedProducts((prevPaginatedProducts) => [...prevPaginatedProducts, ...newPaginatedProducts]);
  }, [pageNumber, allProducts]);

  const handleScroll = (e) => {
    if (e.target.documentElement.scrollHeight - (window.innerHeight + e.target.documentElement.scrollTop) < 20) {
      setPageNumber((prevState) => prevState + 1);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

export default AllProductItems;
