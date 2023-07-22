import { NavLink } from "react-router-dom";

const CompareEmpty = () => {
    return (
        <div className="compare-section-empty">
                <p className="compare-section-empty__text">Your comparison list is empty</p>
                <img className="compare-section-empty__img" src="img/compare/cat.svg" alt="compare-img"/>
                <NavLink to={"/products"}><button className="compare-section-btn" type="button">Add products</button></NavLink>
             </div>
    );
};

export default CompareEmpty;
