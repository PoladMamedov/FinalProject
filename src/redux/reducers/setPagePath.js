import pagePathTypes from "../type/pagePathTypes";

const initialState = {
   pagePath: "home"
};

function pagePathReducer(state = initialState, action = {}) {
   switch (action.type) {
      case pagePathTypes.SET_PAGE_PATH:
         return {
            pagePath: action.payload
         };

      default:
         return state;
   }
}

export default pagePathReducer;