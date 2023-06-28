import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const [urlImg] = useState(props.item.imageUrls[0]);
  const [urlItemNumber] = useState(props.item.itemNo);

  return (
    <>
      <div className={"cardContainer"}>
        <div className={"card"} style={{backgroundImage: `url(${urlImg})`}} >
          <div className={"card__btn"}>
            <Link className={"card__btn-details"} to={`/details/${urlItemNumber}`}>DETAIL</Link>
            <button type={"button"} className={"card__btn-cartContainer"}>
              <img className={"card__btn-svgCart"} src="/img/cart-logo.png" alt="cart-logo" />
            </button>
          </div>
        </div>
      </div>

    </>
  );
}

