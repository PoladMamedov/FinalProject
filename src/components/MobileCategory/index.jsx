import { useState } from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const MobileCategory = ({ category }) => {
   const { categories } = useSelector((state) => state.categories);
   const [isCategoryOpen, setCategoryOpen] = useState(false);
   const subCategories = categories.filter((item) => item.parentId === category);

   return (
      <>
         <li className="header__mobile-category">
            {category}
            <svg onClick={() => setCategoryOpen(!isCategoryOpen)} className={`header__mobile-category-btn${isCategoryOpen ? "--open" : ""}`} xmlns="http://www.w3.org/2000/svg" height="0.7em" style={{ fill: "#393d45" }} viewBox="0 0 384 512">
               <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
            </svg>
         </li>
         {isCategoryOpen && <ul className="header__mobile-subcategory-list">
            {subCategories.map((item) => (
               <li className="header__mobile-subcategory-item" >{item.name}</li>
            ))}
         </ul>}
      </>
   );
};
export default MobileCategory;