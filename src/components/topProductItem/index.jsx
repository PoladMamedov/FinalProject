import React from "react";
import ProductCard from "../productCard";
import useServer from "../../hooks/useServer";
import "../../styles/global.scss";
import "./topProductItem.scss"

function TopProductItem() {

  const { getAllProducts } = useServer();
  console.log(getAllProducts());

  return (
    <>
      <div className={"container"}>
      <div className={"topProduct"} >
        <ProductCard />
      </div>
     </div>
    </>
  );
}
export default TopProductItem
