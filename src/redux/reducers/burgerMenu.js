import { burgerMenuTypes } from "../type/burgerMenu";

const initialState = {
   isMenuOpen: false
}

export function burgerMenuReducer(state = initialState, action) {
   switch (action.type) {

      case burgerMenuTypes.TOGGLE_MENU:
         return {
            ...state,
            isMenuOpen: !state.isMenuOpen
         }

      default:
         return state
   }
}

