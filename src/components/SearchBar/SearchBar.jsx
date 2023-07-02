import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import searchProducts from "../../redux/actions/searchBar";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchInput = e.target.elements.searchInput.value;
    dispatch(searchProducts(searchInput));
    navigate("/products");
  };

  return (
    <>
      <svg
        onClick={handleSearch}
        className="header__nav-search"
        xmlns="http://www.w3.org/2000/svg"
        height="1.1em"
        viewBox="0 0 512 512"
        style={{ fill: "#393d45" }}
      >
        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
      </svg>
      <form
        onSubmit={handleSubmit}
        className={`header__search-form${isSearchOpen ? "--active" : ""}`}
      >
        <input
          className={`header__search-input${isSearchOpen ? "--active" : ""}`}
          type="text"
          placeholder="Search products..."
          name="searchInput"
        />
        <button
          className={`header__search-submit${isSearchOpen ? "--active" : ""}`}
          type="submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.2em"
            viewBox="0 0 512 512"
            style={{ fill: "#393d45" }}
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </button>
        <svg
          onClick={handleSearch}
          className="header__search-close"
          xmlns="http://www.w3.org/2000/svg"
          height="1.4em"
          viewBox="0 0 384 512"
        >
          <path
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
            fill="#393d45"
          />
        </svg>
      </form>
    </>
  );
};

export default SearchBar;
