import { burgerMenuTypes } from "./type/burgerMenu";

export default function toggleMenu() {
   return {
      type: burgerMenuTypes.TOGGLE_MENU,
   };
}
