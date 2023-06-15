
import { NavLink } from "react-router-dom";
import './style.scss';
import { useState } from "react";
const Header = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const [activePage, setActivePage] = useState(0)
   const pages = ['Home', 'Products', 'Cart']

   const handleBtnClick = () => {
      setIsMenuOpen(!isMenuOpen)
   }
   const handlePageClick = (index) => {
      setActivePage(index)
   }
   return (
      <header className="header">
         <NavLink
            className='header__company-logo' to="/">
            Innovation Oasis
         </NavLink>
         <button
            onClick={() => handleBtnClick()}
            className={`header__menu-btn${isMenuOpen ? '--active' : ''}`}
            type="button">
            <span className="header__menu-lines"></span>
            <span className="header__menu-lines"></span>
            <span className="header__menu-lines"></span>
         </button>

         <nav className={`header__nav${isMenuOpen ? '--open' : ''}`}>
            <ul className="header__nav-list">
               {pages.map((item, index) => (
                  <NavLink
                     key={index}
                     onClick={() => handlePageClick(index)}
                     className={`header__nav-item${activePage === index ? '--active' : ''}`}
                     to={`/${item.toLowerCase()}`}>{item}</NavLink >
               ))}
            </ul>
         </nav>

      </header>
   )

}

export default Header