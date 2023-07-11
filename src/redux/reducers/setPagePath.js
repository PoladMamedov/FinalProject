import pagePathTypes from "../type/pagePathTypes";

const initialState = {
   pagePath: "home"
};

// eslint-disable-next-line import/prefer-default-export
export function pagePathReducer(state = initialState, action = {}) {
   switch (action.type) {
      case pagePathTypes.SET_PAGE_PATH:
         return {
            pagePath: action.payload
         };

      default:
         return state;
   }
}
