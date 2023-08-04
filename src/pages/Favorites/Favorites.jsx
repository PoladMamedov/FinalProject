import { useSelector} from "react-redux";
import FavoritesEmpty from "./componentsFav/FavoritesEmpty";
import FavoritesFull from "./componentsFav/FavoritesFull";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.favorites);
  console.log('....list fav', favorites);
  return (
    <>
      <BreadCrumb />
      <section className="favorites">
        <div className="container">
        {!favorites.length ? <FavoritesEmpty /> : <FavoritesFull favorites={favorites}/>}
        </div>
      </section>
    </>
  );
};

export default Favorites;