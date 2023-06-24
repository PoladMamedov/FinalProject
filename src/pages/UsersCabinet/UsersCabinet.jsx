import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/actions/user";

function UsersCabinet() {
  const dispatch = useDispatch();
  const { firstName, lastName } = useSelector((state) => state.user.userInfo);
  return (
    <>
      <h1>Users cabinet in progress....</h1>
      <p>{firstName}</p>
      <p>{lastName}</p>
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
