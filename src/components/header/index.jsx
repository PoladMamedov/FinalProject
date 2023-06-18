import { NavLink } from "react-router-dom";
import "./style.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "../../redux/actions/burgerMenu";

const Header = () => {
   const dispatch = useDispatch();
   const { isMenuOpen } = useSelector((state) => state.isMenuOpen);
   const [activePage, setActivePage] = useState(0);
   const pages = ["Products", "About"];

   const handleBtnClick = () => {
      dispatch(toggleMenu());
   };
   const handleLinkClick = (index) => {
      setActivePage(index);
      dispatch(toggleMenu());
   };

   return (
      <header className="header">
         <div className="header__container-top">
            <h2 className="header__container-top-title">Free shipping across Ukraine</h2>
            <nav className={"header__nav-desktop"}>
               <ul className="header__nav-list">
                  <li className="header__nav-item" key={1}>
                     <NavLink
                        className={`header__nav-link${activePage === 0 ? "--active" : ""}`}
                        onClick={() => handleLinkClick(0)}
                        to={"/"}>Home</NavLink >
                  </li>
                  {pages.map((item, index) => (
                     <li className="header__nav-item" key={index + 1}>
                        <NavLink
                           className={`header__nav-link${activePage === index + 1 ? "--active" : ""}`}
                           onClick={() => handleLinkClick(index + 1)}
                           to={`/${item.toLowerCase()}`}>{item}</NavLink >
                     </li>
                  ))}
               </ul>
            </nav>
            <div className="header__container-top-wrap">
               <p className="header__container-top-lang">ENG</p>
               <p className="header__container-top-lang">UKR</p>
            </div>
         </div>
         <div className="header__container-bottom">

            <svg className="header__nav-search" xmlns="http://www.w3.org/2000/svg" height="1.1em" viewBox="0 0 512 512" style={{ fill: "#393d45" }}>
               <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 
                 376c-34.4 25.2-76\docs\latest\rules\no-trailing-spaces.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
            </svg>
            <NavLink
               className="header__company-logo" 
               to="/"
               onClick={() => handleLinkClick(0)}>
               <img src="/img/main-logo.png" alt="" />
            </NavLink>
            <nav className={`header__nav${isMenuOpen ? "--open" : "''"}`}>
               <ul className="header__nav-list">
                  <li className="header__nav-item" key={1}>
                     <NavLink
                        className={`header__nav-link${activePage === 0 ? "--active" : ""}`}
                        onClick={() => handleLinkClick(0)}
                        to={"/"}>Home</NavLink >
                  </li>
                  {pages.map((item, index) => (
                     <li className="header__nav-item" key={index + 1}>
                        <NavLink
                           className={`header__nav-link${activePage === index + 1 ? "--active" : ""}`}
                           onClick={() => handleLinkClick(index + 1)}
                           to={`/${item.toLowerCase()}`}>{item}</NavLink >
                     </li>
                  ))}
               </ul>
            </nav>

            <div className="header__nav-btn-wrap">
               <NavLink 
               to={"/cart"}
                  key={4}
                  className="header__nav-link--cart"
               >

                  <img className="header__nav-cart" src="/img/cart-logo.png" alt="cart-logo" />
                  <span className="header__nav-cart--count">1</span>

                  {/* В спан записать с редакса количество в корзине */}

               </NavLink>


               <NavLink 
               to={"/login"}
                  key={5}
                  className="header__nav-link--loginBtn"
               >

                  <img className="header__nav-login" src="img/login.png" alt="login-img" />
               </NavLink>
            </div>

            <button
               onClick={() => handleBtnClick()}
               className={`header__menu-btn${isMenuOpen ? "--active" : ""}`}>
               <span className="header__menu-lines"></span>
               <span className="header__menu-lines"></span>
               <span className="header__menu-lines"></span>
            </button>
         </div>
      </header >
   );

};

export default Header;