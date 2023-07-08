import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import fillProducts from "../../redux/actions/products";
import PaginationAllProducts from "../PaginationAllProducts/PaginationAllProducts";
import useServer from "../../hooks/useServer";

function AllProductItems() {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [allProductState, setAllProductState] = useState([]);
  const allProducts = useSelector((state) => state.filteredProducts.filteredProducts);
  const { searchResults } = useSelector((state) => state.search);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const totalSearchedPages = Math.ceil(searchResults.length / productsPerPage);

  const { getAllProducts } = useServer();

  const isCardView = useSelector((state) => state.toggleCard.cardView);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllProducts()
      .then((result) => {
        dispatch(fillProducts(result));
        setAllProductState(result);
      });
  }, []);

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fillProducts(allProductState));
    }
  }, [allProducts, allProductState]);

  useEffect(() => {
    setCurrentPage(1);
  }, [allProducts]);

  const handleResize = () => {
    if (window.innerWidth >= 1200) {
      setProductsPerPage(8);
    } else if (window.innerWidth <= 499) {
      setProductsPerPage(4);
    } else {
      setProductsPerPage(6);
    }
  };

  useLayoutEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const newPaginatedProducts = allProducts.slice(startIndex, endIndex);
    setPaginatedProducts(newPaginatedProducts);
  }, [currentPage, allProducts, productsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="all-product__wrapper">
      <div className="container flex_container">
        <div className={isCardView ? "all-product__card" : "all-product__card-rows"}>
          {searchResults.length >= 1 ? searchResults.map((e) => (
            <ProductCard isCardView={isCardView} active={currentPage} item={e} key={e.itemNo} />
          )) : paginatedProducts.map((e) => (
            // eslint-disable-next-line no-underscore-dangle
            <ProductCard isCardView={isCardView} active={currentPage} item={e} key={e._id} />
          ))}
        </div>
        <PaginationAllProducts currentPage={currentPage} totalPages={searchResults.length >= 1 ? totalSearchedPages : totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}

export default AllProductItems;
