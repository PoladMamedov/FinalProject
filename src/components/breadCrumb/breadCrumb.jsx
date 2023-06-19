import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BreadcrumbItem from "../breadcrumbItem/breadcrumbItem";
import "./style.scss";

const Breadcrumb = () => {
   const location = useLocation();
   const history = useNavigate();
   const [path, setPath] = useState([]);

   useEffect(() => {
      const { pathname } = location;
      const segments = pathname.split("/").filter((segment) => segment !== "");

      setPath((prevPath) => {
         const previousPath = prevPath.slice(0, -1);
         const currentPath = segments;

         if (currentPath.length === previousPath.length + 1) {
            return [...previousPath, currentPath[currentPath.length - 1]];
         }
         if (currentPath.length === previousPath.length - 1) {
            return previousPath;
         }
         return currentPath;
      });
   }, [location]);

   const renderBreadcrumb = () => {
      if (path.length === 0) {
         return <Link className="navigation-block__link" to="/">Home</Link>;
      }

      const breadcrumb = path.map((segment, index) => (
         <BreadcrumbItem
            key={segment}
            to={`/${path.slice(0, index + 1).join("/")}`}
            text={segment.charAt(0).toUpperCase() + segment.slice(1)}
         />
      ));

      return (
         <>
            <Link className="navigation-block__link" to="/">Home</Link>
            {breadcrumb}
         </>
      );
   };

   const handleGoBack = () => {
      history(-1);
   };

   return (
      <>
         <div className="container">
            <div className="navigation-block">
               {renderBreadcrumb()}
               <button className="navigation-block__back-btn" type="button" onClick={handleGoBack}>
               </button>
            </div>
         </div>
      </>

   );
};

export default Breadcrumb;


