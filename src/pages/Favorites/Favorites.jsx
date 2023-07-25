import { useSelector} from "react-redux";
import FavoritesEmpty from "./FavoritesEmpty";
import FavoritesFull from "./FavoritesFull";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";


const Favorites = () => {
  const { favorites } = useSelector((state) => state.favorites);
  return (
    <>
      <BreadCrumb />
      <section className="favorites">
        <div className="container">
        {!favorites.length ? <FavoritesEmpty /> : <FavoritesFull />}
        </div>
      </section>
    </>
  );
};

export default Favorites;