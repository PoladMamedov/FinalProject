import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import fillProducts from "../../redux/actions/products";
import PaginationAllProducts from "../PaginationAllProducts/PaginationAllProducts";
import useServer from "../../hooks/useServer";
import RecentlyViewedProducts from "../RecentlyProducts/RecentlyProducts";

function AllProductItems(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [allProductState, setAllProductState] = useState([]);
  const [filteredHeadphones, setFilteredHeadphones] = useState([]);
  const [filteredKeyboards, setFilteredKeyboards] = useState([]);
  const [filteredSmartWatch, setFilteredSmartWatch] = useState([]);
  const [filteredMouses, setFilteredMouses] = useState([]);

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
        if (props.products) {
          setAllProductState(result);
          dispatch(fillProducts(result));
        } else if (props.prodmouse) {
          setFilteredMouses(result.filter((obj) => obj.categories === "mouses"));
        } else if (props.prodhead) {
          setFilteredHeadphones(result.filter((obj) => obj.categories === "headphones"));
        } else if (props.prodkeyb) {
          setFilteredKeyboards(result.filter((obj) => obj.categories === "keyboards"));
        } else if (props.prodsmartwatch) {
          setFilteredSmartWatch(result.filter((obj) => obj.categories === "smart_watch"));
        }
      });
  }, []);

  useEffect(() => {
    if (allProducts.length === 0 && props.products) {
      dispatch(fillProducts(allProductState));
    } else if (allProducts.length === 0 && props.prodmouse) {
      dispatch(fillProducts(filteredMouses));
    } else if (allProducts.length === 0 && props.prodkeyb) {
      dispatch(fillProducts(filteredKeyboards));
    } else if ((allProducts.length === 0) && props.prodhead) {
      dispatch(fillProducts(filteredHeadphones));
    } else if (allProducts.length === 0 && props.prodsmartwatch) {
      dispatch(fillProducts(filteredSmartWatch));
    }
  }, [allProducts]);

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
          {paginatedProducts.map((e) => (
            // eslint-disable-next-line no-underscore-dangle
            <ProductCard isCardView={isCardView} active={currentPage} item={e} key={e._id} />
          ))}
        </div>
        <PaginationAllProducts currentPage={currentPage} totalPages={searchResults.length >= 1 ? totalSearchedPages : totalPages} onPageChange={handlePageChange} />
      </div>
      <RecentlyViewedProducts active={currentPage} isCardView={isCardView}/>
    </div>
  );
}

export default AllProductItems;
