/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../redux/actions/counterFilter";
import Filter from "../../components/Filter/Filter";
import FilterMini from "../../components/Filter/FilterMini";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import SortFilter from "../../components/SortFilter/SortFilter";
import AllProductItems from "../../components/AllProductItems/AllProductItems";


const Products = () => {
  const dispatch = useDispatch();


  const filterFull = React.createRef();
  const filterMini = useRef();
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);

  // для изменения кол-ва в скобках при свернутом фильтре
  function addCountFilter(e) {
    return e.target.checked ? dispatch(increment()) : dispatch(decrement());
  }

  function toggleFilter() {
    const filter = filterFull.current;
    const isHidden = filter.classList.contains("hidden");
    if (isHidden) {
      filter.classList.remove("hidden");
      filter.classList.add("hidden-closed");
    } else {
      filter.classList.add("hidden");
      filter.classList.remove("hidden-closed");
    }
    filterMini.current.classList.toggle("visibility");
    setIsFilterCollapsed(!filterMini.current.classList.contains("visibility"));
  }

  const { filteredProducts } =  useSelector((state) => state.filteredProducts);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(filteredProducts);
  }, [filteredProducts]);

    return (
        <>
        <Breadcrumb />
        <section>
          <div className="container">
            <div className="products-section">
              <SortFilter products={products} isCollapsed={isFilterCollapsed}/>
              <Filter toggle={toggleFilter} addCounter={addCountFilter} ref={filterFull} apply={toggleFilter}/>
              <FilterMini toggle={toggleFilter} ref={filterMini} />
              <AllProductItems />
            </div>
          </div>
        </section>
      </>
    );
};

export default Products;

