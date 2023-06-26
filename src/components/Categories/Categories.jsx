import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchCategories } from "../../redux/actions/categories";
import "./categories.scss";

function Categories() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Фильтр категории и их подКатегории по parentId
  const groupCategories = (parentId) => {
    const filteredCategories = categories.filter(
      (category) => category.parentId === parentId
    );

    return filteredCategories.map((category) => (
      // eslint-disable-next-line no-underscore-dangle
      <li key={category._id} className="subcategory__list-item">
        <NavLink className="subcategory__list-link">{category.name}</NavLink>
        {groupCategories(category.id)}
      </li>
    ));
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(`Error:${error}`);
  }
  return (
    <div className="category">
      <ul className="category__list">
        {categories
          .filter((category) => category.parentId === "null")
          .map((category) => (
            <li
              key={category.id}
              onMouseEnter={() => setActiveCategory(category.id)}
              onMouseLeave={() => setActiveCategory(null)}
              className="category__list-item"
            >
              <NavLink className="category__list-link">{category.name}</NavLink>
              {activeCategory === category.id && (
                <ul className="subcategory__list">
                  {groupCategories(category.id)}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div >
  );
}

export default Categories;
