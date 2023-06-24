import userTypes from "../type/user";

const initialState = {
  userInfo: {},
  token: null,
  loading: false,
  error: null,
};

// eslint-disable-next-line default-param-last
function userReducer(state = initialState, action) {
  switch (action.type) {
    case userTypes.USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case userTypes.USER_SUCCESS:
      return {
        userInfo: action.payload,
        loading: false,
        error: null,
      };
    case userTypes.USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
