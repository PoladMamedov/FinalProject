/* eslint-disable no-confusing-arrow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-lonely-if */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable prefer-destructuring */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useEffect,
  forwardRef,
  useRef
} from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component";
import { useDispatch, useSelector } from "react-redux";
import useServer from "../../hooks/useServer";
import { reset } from "../../redux/actions/counterFilter";
import { addFilteredProducts, removeFilteredProducts } from "../../redux/actions/filteredProducts";
import { sortLowToHighPrice } from "../../redux/actions/sortFilter";
import notificationsSettings from "../../constants/constants";
import ProductsCategoriesForm from "./components/ProductsCategoriesForm";
import ProductsPricesForm from "./components/ProductsPricesForm";
import ButtonsInFilter from "./components/ButtonsInFilter";

const Filter = forwardRef(({
  categories, toggle, addCounter, apply, subcategorieParent
}, ref) => {
  const { sortValue } = useSelector((state) => state.sortFilter);
  const errorText = useRef();
  const server = useServer();

  const navigate = useNavigate();

  const { subcategory } = useSelector((state) => state.subcategory);
  let allCategories = categories.map(({ name }) => name.toLowerCase()).filter((item) => item !== "all");
  allCategories = allCategories.map((item) => item.replace(/ /g, "_"));
  const dispatch = useDispatch();

  const price = useSelector((state) => state.filteredProducts.filteredProducts);
  const new_array = price.map((e) => {
    return e.currentPrice;
  });

  let minArr = Math.ceil(Math.min(...new_array));
  let maxArr = Math.ceil(Math.max(...new_array));

  // стейт с ценой
  const [valuesPrice, setValuesPrice] = useState({
    Max: "",
    Min: "",
  });

  // стейт чексбоксов
  const [checkedItems, setCheckedItems] = useState(
    categories.map(() => false)
  );

  // стейт для хранения выбранных категорий
  const [selectedCategories, setSelectedCategories] = useState([]);

 const [urlParams, setUrlParams] = useState({});

  useEffect(() => {
    if (subcategorieParent) {
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const newUrlParams = {};
    for (const [key, value] of params.entries()) {
      newUrlParams[key] = value;
    }
    setUrlParams(newUrlParams);
    setValuesPrice({
      Max: newUrlParams.maxPrice || "",
      Min: newUrlParams.minPrice || "",
    });
    setSelectedCategories(newUrlParams.categories ? newUrlParams.categories.split(",") : []);
  }, []);

  useEffect(() => {
    if (subcategorieParent) {
      return;
    }
    let arr = categories.map(({name}) => name.toLowerCase().replace(/ /g, "_"));
    arr = arr.map((item) => item === "smart_watches" ? "smart_watch" : item);
    setCheckedItems(arr.map((category) => selectedCategories.includes(category)));
    fetchFilteredProducts(selectedCategories, subcategorieParent, valuesPrice.Min, valuesPrice.Max, sortValue);
  }, [selectedCategories]);

  // функция для обновления url
  function updateUrl(path) {
    const params = new URLSearchParams(path);
    const queryString = `?${params.toString()}`;
    navigate(`${queryString}`);
  }

  // для отправки на сервер запросов
async function fetchFilteredProducts(checkedCategories, subcategorie, minPrice, maxPrice, sort ) {
    let filteredProductsResponse;
    try {
      if (maxPrice !== "" && minPrice !== "") {
        // Отправка запроса на сервер для фильтрации только по цене
        if (checkedCategories.length === 0) {
          if (subcategorie) {
            filteredProductsResponse = await server.getFiltersPricesBySubcategory(
              subcategorieParent,
              minPrice,
              maxPrice,
              sort
            );
            updateUrl({
              categories: subcategorieParent,
              minPrice: valuesPrice.Min,
              maxPrice: valuesPrice.Max,
              sort: `${sortValue}currentPrice`
            });

          } else {
            filteredProductsResponse = await server.getFiltersPrices(
              minPrice,
              maxPrice,
              sort
            );
            updateUrl({
              minPrice: valuesPrice.Min,
              maxPrice: valuesPrice.Max,
              sort: `${sortValue}currentPrice`
            });
          }
        } else {
          // Отправка запроса на сервер для фильтрации по категориям и цене
          if (subcategorie) {
            filteredProductsResponse = await server.getFiltersCategoriesPricesBySubcategory(
              subcategorieParent,
              checkedCategories,
              minPrice,
              maxPrice,
              sort
            );
            updateUrl({
              categories: subcategorieParent,
              filtertype: checkedCategories,
              minPrice: valuesPrice.Min,
              maxPrice: valuesPrice.Max,
              sort: `${sortValue}currentPrice`
            });
          } else {
            filteredProductsResponse = await server.getFiltersCategoriesPrices(
              checkedCategories,
              minPrice,
              maxPrice,
              sort
            );
            updateUrl({
              categories: checkedCategories,
              minPrice: valuesPrice.Min,
              maxPrice: valuesPrice.Max,
              sort: `${sortValue}currentPrice`
            });
          }
        }
      } else {
        // Отправка запроса на сервер для фильтрации только по категориям
        if (subcategorie) {
          filteredProductsResponse = await server.getFiltersCategoriesBySubcategory(
            subcategorieParent,
            checkedCategories,
            sort
          );
          updateUrl({
            categories: subcategorieParent,
            filtertype: checkedCategories,
            sort: `${sortValue}currentPrice`
          });
        } else {
          filteredProductsResponse = await server.getFiltersCategories(
            checkedCategories,
            sort
          );
          updateUrl({
            categories: checkedCategories,
            sort: `${sortValue}currentPrice`
          });
        }
      }
      const products = Object.values(filteredProductsResponse);
      const firstArray = products[0];
      dispatch(addFilteredProducts(firstArray)); // добавляю фильтрованные продукты в редакс
    } catch (err) {
      Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.error, message: err.message });
    }
  }

  const min = parseInt(valuesPrice.Min, 10);
  const max = parseInt(valuesPrice.Max, 10);
  const isButtonDisabled = Number.isNaN(min) || Number.isNaN(max) || (min < minArr || max > maxArr) || min > max;

  // для отправки запроса при нажатии на кнопку устанить цену
  function handleSetPrice() {
    fetchFilteredProducts(selectedCategories, subcategorieParent, valuesPrice.Min, valuesPrice.Max, sortValue);
  }

  function handlePriceBlur() {
    if (min > max) {
      errorText.current.style.display = "block";
    } else {
      errorText.current.style.display = "none";
    }
  }

  async function handleCheckboxChange(e, index) {
    let category = e.target.name.toLowerCase().replace(/ /g, "_");
    if (category === "smart_watches") {
      category = category.replace(/es$/, "");
    }
    const isChecked = e.target.checked;

    setCheckedItems((prevCheckedItems) => [
      ...prevCheckedItems.slice(0, index),
      !prevCheckedItems[index],
      ...prevCheckedItems.slice(index + 1),
    ]);

    let updatedSelectedCategories;

    // Обновление массива выбранных категорий
    if (category === "all") {
      setCheckedItems(checkedItems.map(() => true));
      updatedSelectedCategories = allCategories;
    } else {
      if (isChecked) {
        updatedSelectedCategories = [...selectedCategories, category];
      } else {
        updatedSelectedCategories = selectedCategories.filter((c) => c !== category);
      }

      // Снятие галочки с категории "All", если все выбраны и кликаем на что-то другое.
      if (!isChecked && selectedCategories.length === allCategories.length) {
        const allIndex = categories.findIndex((item) => item.name === "All");
        setCheckedItems((prev) => [
          ...prev.slice(0, allIndex),
          false,
          ...prev.slice(allIndex + 1),
        ]);
        updatedSelectedCategories = updatedSelectedCategories.filter((c) => c !== "all");
      }
    }
    setSelectedCategories(updatedSelectedCategories);
    // Отправка запроса на сервер для фильтрации продуктов по категориям
    fetchFilteredProducts(updatedSelectedCategories, subcategorieParent, valuesPrice.Min, valuesPrice.Max, sortValue);
  }

  // для сброса всех фильтров
  function resetBtnClick() {
    setValuesPrice((prevState) => ({ ...prevState, Max: "", Min: "" }));
    setCheckedItems(checkedItems.map(() => false));
    setSelectedCategories([]);
    dispatch(reset());
    dispatch(removeFilteredProducts());
    navigate("");
  }

  const resetBtn = useRef();

  useEffect(() => {
    if (checkedItems.every((item) => item === false) && Object.values(valuesPrice).every((item) => item === "")) {
      resetBtn.current.disabled = true;
    } else {
      resetBtn.current.disabled = false;
    }
  }, [checkedItems, valuesPrice]);

  // const [isWaitSortFilter, setIsWaitSortFilter] = useState(false);
  
  // useEffect(() => {
  //   // dispatch(sortLowToHighPrice());
  //   setIsWaitSortFilter(true);
  // }, []);

  useEffect(() => {
    // if (!isWaitSortFilter) {
    //   return;
    // }
    if (subcategorieParent) {
      let initialSelectedCategories;
      if (subcategory === "All") {
        setCheckedItems(checkedItems.map(() => true));
        initialSelectedCategories = allCategories;
      } else {
        setCheckedItems(categories.map((category) => subcategory.includes(category.name)));
        initialSelectedCategories = categories.filter((category) => subcategory.includes(category.name)).map((category) => category.name.toLowerCase().replace(/ /g, "_"));
      }
      setSelectedCategories(initialSelectedCategories);
      fetchFilteredProducts(initialSelectedCategories, subcategorieParent, valuesPrice.Min, valuesPrice.Max, sortValue);
    }
  }, []);
  

  useEffect(() => {
    if (sortValue !== undefined) {
      const url = new URL(window.location);
      url.searchParams.set("sort", `${sortValue}currentPrice`);
      window.history.pushState({}, "", url);
    }
  }, [sortValue]);

  const propsProductsCategoriesForm = {
      categories,
      checkedItems,
      handleCheckboxChange,
      addCounter
  };

  const propsProductsPricesForm = {
        minArr,
        maxArr,
        minPrice: valuesPrice.Min,
        maxPrice: valuesPrice.Max,
        setValuesPrice,
        handlePriceBlur
  };

  const propsButtonsInFilter = {
    errorText,
    isButtonDisabled,
    handleSetPrice,
    resetBtn,
    resetBtnClick,
    apply
  };

  return (
    <>
      <div className="filter-section" ref={ref}>
        <h3 className="filter-section__title">Filter</h3>
        <svg onClick={toggle} className="filter-section-btn-close" width={25} height={25} xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" id="close"><path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M15.7,14.3c0.4,0.4,0.4,1,0,1.4c-0.4,0.4-1,0.4-1.4,0L12,13.4l-2.3,2.3c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l2.3-2.3L8.3,9.7c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l2.3,2.3l2.3-2.3c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4L13.4,12L15.7,14.3z"></path></svg>
        <div className="filter-section-container">
        <ProductsCategoriesForm {...propsProductsCategoriesForm}/>
        <ProductsPricesForm {...propsProductsPricesForm}/>
        <ButtonsInFilter {...propsButtonsInFilter}/>
        </div>
      </div>
    </>
  );
});

export default Filter;