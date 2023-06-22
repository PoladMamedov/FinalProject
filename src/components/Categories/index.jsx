import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchCategories } from "../../redux/actions/categories";
import "./style.scss";

function Categories() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const [activeCategory, setActiveCategory] = useState(null);

  console.log(categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const groupCategories = (parentId) => {
    const filteredCategories = categories.filter(
      (category) => category.parentId === parentId
    );

    return filteredCategories.map((category) => (
      <li key={category._id} className="subcategory__list-item">
        <NavLink className="subcategory__list-link">{category.name}</NavLink>
        {groupCategories(category.id)}
      </li>
    ));
  };

  return (
    <div className="category">
      <ul className="category__list">
        {categories
          .filter((category) => category.parentId === "null")
          .map((category) => (
            <li key={category._id} className="category__list-item">
              <NavLink
                className="category__list-link"
                onMouseEnter={() => setActiveCategory(category.id)}
              >
                {category.name}
              </NavLink>

              {activeCategory === category.id && (
                <ul
                  className="subcategory__list"
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  {groupCategories(category.id)}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Categories;
