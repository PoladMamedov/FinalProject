/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { increment, decrement } from "../../redux/actions/counterFilter";
import Filter from "../Filter/Filter";
import FilterMini from "../Filter/FilterMini";
import Breadcrumb from "../BreadCrumb/BreadCrumb";

const ProductsSection = () => {
  const dispatch = useDispatch();

  const filterFull = React.createRef();
  const filterMini = useRef();

  // для изменения кол-ва в скобках при свернутом фильтре
  function addCountFilter(e) {
    return e.target.checked ? dispatch(increment()) : dispatch(decrement());
  }

  // для переключения свернутого и развернуго фильтра на мобил.
  function toggleFilter() {
    filterFull.current.classList.toggle("hidden");
    filterMini.current.classList.toggle("visibility");
  }
  return (
    <>
      <Breadcrumb />
      <section>
        <div className="container">
          <div className="products-section">
            <Filter toggle={toggleFilter} addCounter={addCountFilter} ref={filterFull} />
            <FilterMini toggle={toggleFilter} ref={filterMini} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsSection;
