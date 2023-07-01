/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { increment, decrement } from "../../redux/actions/counterFilter";
import Filter from "../Filter/Filter";
import FilterMini from "../Filter/FilterMini";
import Breadcrumb from "../BreadCrumb/BreadCrumb";
import SortFilter from "../SortFilter/SortFilter";

const ProductsSection = () => {
  const dispatch = useDispatch();
 
  const filterFull = React.createRef();
  const filterMini = useRef();
  const [isSortFilterVisible, setIsSortFilterVisible] = useState(false);
  const isNarrowScreen = window.matchMedia("(max-width: 640px)").matches;

  // для изменения кол-ва в скобках при свернутом фильтре
  function addCountFilter(e) {
    return e.target.checked ? dispatch(increment()) : dispatch(decrement());
  }

  // для переключения свернутого и развернуго фильтра на мобил.
  function toggleFilter() {
    filterFull.current.classList.toggle("hidden");
    filterMini.current.classList.toggle("visibility");
    setIsSortFilterVisible(filterFull.current.classList.contains("hidden"));
  }

  return (
    <>
      <Breadcrumb />
      <section>
        <div className="container">
          <div className="products-section">
          {(!isNarrowScreen || isSortFilterVisible) && <SortFilter />}
            <Filter toggle={toggleFilter} addCounter={addCountFilter} ref={filterFull} apply={toggleFilter}/>
            <FilterMini toggle={toggleFilter} ref={filterMini} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsSection;
