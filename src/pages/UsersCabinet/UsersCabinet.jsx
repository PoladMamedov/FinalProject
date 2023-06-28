import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/actions/user";

function UsersCabinet() {
  const dispatch = useDispatch();
  const {
  firstName, lastName, token, login, email
  } = useSelector((state) => state.user.userInfo);
  return (
    <>
      <h1>Users cabinet in progress....</h1>
      <p>{firstName}</p>
      <p>{lastName}</p>
      <p>{login}</p>
      <p>{email}</p>
      <p>{token}</p>
      <button
        className="login-section__form-submit-btn"
        type="button"
        onClick={() => {
          dispatch(setUserInfo({}));
        }}
      >
        LOG OUT
      </button>
    </>
  );
}

export default UsersCabinet;
