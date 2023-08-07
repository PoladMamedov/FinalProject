import { NavLink } from "react-router-dom";

const FavoritesEmpty = () => {
    return (
        <div className="fav-empty">
            <p className="fav-empty__text">Your wish list is empty!</p>
            <img className="fav-empty__img" src="https://res.cloudinary.com/dfinki0p4/image/upload/v1690293879/empty-fav_osxws3.png" alt="fav-img" />
            <NavLink to={"/products"}>
                <button className="compare-section-btn" type="button">Add products</button></NavLink>
        </div>
    );
};

export default FavoritesEmpty;
