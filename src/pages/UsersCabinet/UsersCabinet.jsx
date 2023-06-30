import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearErrorAndMessages, setUserInfo } from "../../redux/actions/user";
import PersonalDataEditForm from "../../components/PersonalDataEditForm/PersonalDataEditForm";
import PasswordChangeForm from "../../components/PasswordChangeForm/PasswordChangeForm";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";

function UsersCabinet() {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(clearErrorAndMessages());
    };
  }, []);
  return (
    <>
      <Breadcrumb />

      <section className="users-cabinet">
        <div className="container">
          <h2 className="section-title">Personal data</h2>
          <PersonalDataEditForm />
          <h2 className="section-title">Password</h2>
          <PasswordChangeForm />
          <div className="users-cabinet__logout-btn-wrapper">
            <button
              className="users-cabinet__btn logout-btn"
              type="button"
              onClick={() => {
                dispatch(setUserInfo({}));
              }}
            >
              LOG OUT
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default UsersCabinet;
