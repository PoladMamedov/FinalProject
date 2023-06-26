import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BreadcrumbItem from "../BreadCrumbItem/BreadCrumbItem";
import setPagePath from "../../redux/actions/setPagePath";
import "./breadCrumb.scss";

const Breadcrumb = () => {
   const dispatch = useDispatch();
   const location = useLocation();
   const history = useNavigate();
   const [path, setPath] = useState([]);
   useEffect(() => {
      const { pathname } = location;
      const segments = pathname.split("/").filter((segment) => segment !== "");
      const currentSegment = pathname.substring(1);
      dispatch(setPagePath(currentSegment === "" ? "home" : currentSegment));
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
   }, [location, dispatch]);

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
   const handleGoForward = () => {
      history(+1);
   };

   return (
      <>
         <div className="container">
            <div className="navigation-block">
               {renderBreadcrumb()}
               <svg className="navigation-block__back-btn" onClick={handleGoBack} xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 320 512" fill="#393d45">
                  <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
               </svg>
               <svg className="navigation-block__forward-btn" onClick={handleGoForward} xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 320 512" fill="#393d45">
                  <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
               </svg>
            </div>
         </div>
      </>

   );
};

export default Breadcrumb;


