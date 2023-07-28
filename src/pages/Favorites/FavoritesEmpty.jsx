import { NavLink } from "react-router-dom";

const FavoritesEmpty = () => {
    return (
        <div className="fav-empty">
            <p className="fav-empty__text">Your favorite list is empty!</p>
                <img className="fav-empty__img" src="img/empty-fav.png" alt="fav-img"/>
                <NavLink to={"/products"}>
                    <button className="compare-section-btn" type="button">Add products</button></NavLink>
             </div>
    );
};

export default FavoritesEmpty;
