import { burgerMenuTypes } from "../type/burgerMenu";

export function toggleMenu() {
   return {
      type: burgerMenuTypes.TOGGLE_MENU,
   }
}
