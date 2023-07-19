/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useServer from "../../hooks/useServer";
import { removeCompareProducts, deleteAllCompareProducts } from "../../redux/actions/compareProducts";
import { decrementCompare, resetCompare } from "../../redux/actions/counterCompare";

const CompareFull = () => {
    const { compareProducts } = useSelector((state) => state.compareProducts);
    const server = useServer();
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchCompareProducts() {
            try {
                const resultCompareProducts = await Promise.all(compareProducts.map((product) => server.getProduct(product)));
                setProducts(resultCompareProducts);
            } catch (err) {
                console.log(err);
            }
        }
        fetchCompareProducts();
    }, [compareProducts]);

    function removeCompareProductsfromTable(itemNo) {
        dispatch(removeCompareProducts(itemNo));
        dispatch(decrementCompare());
    }

    function removeAllCompareProductsFromTable() {
        dispatch(deleteAllCompareProducts());
        dispatch(resetCompare());

    }

    return (
        <div className="compare-section-full">
            <div className="compare-section-full-btn-wrapper">
                <NavLink to={"/products"}><button className="compare-section-btn" type="button">Add products</button></NavLink>
                <button onClick={() => removeAllCompareProductsFromTable()} className="compare-section-btn" type="button">Delete all products</button>
            </div>
            <div className="compare-section-full-wrapper-table">
                <table className="compare-section-full-table">
                    <thead>
                        <tr>
                            <th></th>
                            {products.map((item, idx) => {
                                return (
                                    <th key={idx}>
                                        <div className="compare-section-full-item__header">
                                            <img
                                                className="compare-section-full-item__img"
                                                src={item.imageUrls[0]}
                                                alt={"product"}
                                            ></img>
                                            <button
                                                className="compare-section-full-item__closebtn"
                                                onClick={() => removeCompareProductsfromTable(item.itemNo)}
                                                type={"button"}
                                            ></button>
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            {products.map((item, idx) => {
                                return <td key={idx}>{item.name}</td>;
                            })}
                        </tr>
                        <tr>
                            <td>Brand</td>
                            {products.map((item, idx) => {
                                return <td key={idx}>{item.properties.brand}</td>;
                            })}
                        </tr>
                        <tr>
                            <td>Color</td>
                            {products.map((item, idx) => {
                                return <td key={idx}>{item.properties.color}</td>;
                            })}
                        </tr>
                        <tr>
                            <td>Type</td>
                            {products.map((item, idx) => {
                                return <td key={idx}>{item.properties.type}</td>;
                            })}
                        </tr>
                        <tr>
                            <td>Connection</td>
                            {products.map((item, idx) => {
                                return <td key={idx}>{item.properties.connection}</td>;
                            })}
                        </tr>
                        <tr>
                            <td>Quantity</td>
                            {products.map((item, idx) => {
                                return <td key={idx}>{item.quantity}</td>;
                            })}
                        </tr>
                        <tr>
                            <td>Categories</td>
                            {products.map((item, idx) => {
                                return <td key={idx}>{item.categories}</td>;
                            })}
                        </tr>
                        <tr>
                            <td>Current Price</td>
                            {products.map((item, idx) => {
                                return <td key={idx}>{item.currentPrice}</td>;
                            })}
                        </tr>
                        <tr>
                            <td>Previous Price</td>
                            {products.map((item, idx) => {
                                return <td key={idx}>{item.previousPrice}</td>;
                            })}
                        </tr>
                        <tr>
                            <td>Noise Cancelling</td>
                            {products.map((product, idx) => {
                                return <td key={idx}>{product.properties.noiseCancellation === true ? "+" : "-"}</td>;
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default CompareFull;
