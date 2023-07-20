import { useSelector } from "react-redux";
import CompareEmpty from "./CompareEmpty";
import CompareFull from "./CompareFull";

const Compare = () => {
    const { compareProducts } = useSelector((state) => state.compareProducts);
    return (
        <section className="compare-section">
        <div className="container">
           {!compareProducts.length ? <CompareEmpty /> : <CompareFull />}
        </div>
        </section>
    );
};

export default Compare;
