import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrorAndMessages, setUserInfo } from "../../redux/actions/user";
import PersonalDataEditForm from "../../components/PersonalDataEditForm/PersonalDataEditForm";
import PasswordChangeForm from "../../components/PasswordChangeForm/PasswordChangeForm";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";

function UsersCabinet() {
  const dispatch = useDispatch();
  // eslint-disable-next-line object-curly-newline
  const { firstName, lastName, login, email } = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    return () => {
      dispatch(clearErrorAndMessages());
    };
  }, []);
  return (
    <>
      <Breadcrumb />
      <section className="users-cabinet">
        <div className="container users-cabinet__content-wrapper">
          <aside className="users-cabinet__info">
            <img width={200} height={200} src="./img/user-cabinet/profile.png" alt="" />
            <p>{firstName}</p>
            <p>{lastName}</p>
            <p>{login}</p>
            <p>{email}</p>
            {/* <div className="users-cabinet__logout-btn-wrapper"> */}
            <button
              className="users-cabinet__btn logout-btn"
              type="button"
              onClick={() => {
                dispatch(setUserInfo({}));
              }}
            >
              LOG OUT
            </button>
            {/* </div> */}
          </aside>
          <div>
            <h2 className="section-title">Personal data</h2>
            <PersonalDataEditForm />
            <h2 className="section-title">Password</h2>
            <PasswordChangeForm />
          </div>
        </div>
      </section>
    </>
  );
}

export default UsersCabinet;
