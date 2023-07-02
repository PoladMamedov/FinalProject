import searchBarTypes from "../type/searchBar";

function searchProducts(searchTerm) {
    return async (dispatch) => {
        dispatch({ type: searchBarTypes.SEARCH_PRODUCTS_REQUEST });

        const searchPhrases = {
            query: searchTerm
        };

        try {
            const response = await fetch("https://final-project-backend-phi.vercel.app/api/products/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(searchPhrases)
            });

            if (!response.ok) {
                throw new Error("Search request failed.");
            }

            const products = await response.json();

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