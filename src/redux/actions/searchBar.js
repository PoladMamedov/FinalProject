import searchBarTypes from "../type/searchBar";
import useServer from "../../hooks/useServer";

function searchProducts(searchTerm) {
    return async (dispatch) => {
        const server = useServer();
        dispatch({ type: searchBarTypes.SEARCH_PRODUCTS_REQUEST });

        try {
            const products = await server.searchProducts(searchTerm);

            dispatch({
                type: searchBarTypes.SEARCH_PRODUCTS_SUCCESS,
                payload: products
            });

        } catch (error) {
            dispatch({
                type: searchBarTypes.SEARCH_PRODUCTS_FAILURE,
                payload: error.message
            });
        }
    };
}

export default searchProducts;