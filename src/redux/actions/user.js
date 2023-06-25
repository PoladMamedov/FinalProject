import userTypes from "../type/user";
import useServer from "../../hooks/useServer";

export function setUserInfo(data) {
  return {
    type: userTypes.USER_SUCCESS,
    payload: data,
  };
}
export function loadingUserInfo() {
  return {
    type: userTypes.USER_REQUEST,
  };
}

export function failedToLogin(data) {
  return {
    type: userTypes.USER_FAILURE,
    payload: data,
  };
}

export const fetchUser = (userData) => {
  return async (dispatch) => {
    const { loginUser, getUser } = useServer();
    try {
      dispatch(loadingUserInfo());
      const loginResult = await loginUser(userData);
      //   if (!loginResult.token) {
      //     throw new Error("Unauthorized");
      //   }
      const user = await getUser(loginResult.token);

      const res = {
        ...loginResult,
        ...user,
      };
      dispatch(setUserInfo(res));
    } catch (error) {
      dispatch(failedToLogin(error));
    }
  };
};
