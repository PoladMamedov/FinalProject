/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Skeleton from "./Skeleton";
import { addSubCategory } from "../../redux/actions/subcategories";

function Categories() {
  const dispatch = useDispatch();

  const allProduct = useSelector(
    (state) => state.filteredProducts.filteredProducts
  );

  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );
  const [activeCategory, setActiveCategory] = useState(null);
  // Фильтр категории и их подКатегории по parentId
  const groupCategories = (parentId) => {
    const filteredCategories = categories.filter(
      (category) => category.parentId === parentId
    );

    const handleCategoryClick = (name) => {
           dispatch(addSubCategory(name));
    };

    return filteredCategories.map((category) => (
      // eslint-disable-next-line no-underscore-dangle
      <li key={category._id} className="subcategory__list-item" onClick={() => handleCategoryClick(category.name)}>
        <NavLink to={`${category.parentId}`} className="subcategory__list-link" name={category.name}>{category.name}</NavLink>
        {groupCategories(category.id)}
      </li>
    ));
  };

  if (error) {
    console.log(`Error:${error}`);
  }
  return (
    <div className="category">
      <div className="container">
        {loading ? <div className="skeleton__loader"><Skeleton /></div> : <ul className="category__list">
          {categories
            .filter((category) => category.parentId === "null")
            .map((category) => (
              <li
                key={category.id}
                onMouseEnter={() => setActiveCategory(category.id)}
                onMouseLeave={() => setActiveCategory(null)}
                className="category__list-item"
              >
                <NavLink onClick={() => dispatch(addSubCategory("All"))} to={`/${category.name.replace("Smart watches", "watches")}`} className="category__list-link">{category.name}</NavLink>
                {activeCategory === category.id && (
                  <ul className="subcategory__list">
                    {groupCategories(category.id)}
                  </ul>
                )}
              </li>
            ))}
        </ul>}
      </div>
    </div >
  );
}

export default Categories;
