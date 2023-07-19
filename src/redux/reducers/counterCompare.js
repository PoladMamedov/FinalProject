/* eslint-disable default-param-last */
import counterCompareTypes from "../type/counterCompare";

const initialState = {
    count: 0
};

export default function counterCompareReducer(state = initialState, action) {
    switch (action.type) {
        case counterCompareTypes.INCREASE_COMPARE_COUNTER:
            return {
                ...state,
                count: state.count + 1
            };
        case counterCompareTypes.DECREASE_COMPARE_COUNTER:
            return {
                ...state,
                count: state.count - 1
            };
        case counterCompareTypes.RESET_COMPARE_COUNTER:
            return {
                ...state,
                count: 0
            };
        default: return state;
    }
}