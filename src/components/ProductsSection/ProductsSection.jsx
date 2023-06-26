/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
import React, { useState, useRef } from "react";
import Filter from "../Filter/Filter";
import FilterMini from "../Filter/FilterMini";

const ProductsSection = () => {
  const [counter, setCounter] = useState(0);
  const filterFull = React.createRef();
  const filterMini = useRef();

  // для изменения кол-ва в скобках при свернутом фильтре
  function addCountFilter(e) {
    return e.target.checked ? setCounter(counter + 1) : setCounter(counter - 1);
  }

  // для переключения свернутого и развернуго фильтра на мобил.
  function toggleFilter() {
    filterFull.current.classList.toggle("hidden");
    filterMini.current.classList.toggle("visibility");
  }
  return (
    <section>
      <div className="container">
        <div className="products-section">
          <Filter toggle={toggleFilter} addCounter={addCountFilter} ref={filterFull} />
          <FilterMini toggle={toggleFilter} count={counter} ref={filterMini} />
          <div className="products-section-cards">Карточки продуктов</div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
