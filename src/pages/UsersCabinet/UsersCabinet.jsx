import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "cloudinary-react";
import cloudinaryConfig from "../../config/cloudinaryConfig";
import { clearErrorAndMessages, setUserInfo } from "../../redux/actions/user";
import PersonalDataEditForm from "../../components/PersonalDataEditForm/PersonalDataEditForm";
import PasswordChangeForm from "../../components/PasswordChangeForm/PasswordChangeForm";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";

function UsersCabinet() {
  const dispatch = useDispatch();
  // eslint-disable-next-line object-curly-newline
  const { firstName, lastName, email } = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    return () => {
      dispatch(clearErrorAndMessages());
    };
  }, []);
  return (
    <>
      <Breadcrumb />
      <section className="users-cabinet">
        <h2 className="section-title">My account</h2>
        <div className="container users-cabinet__content-wrapper">
          <aside className="users-cabinet__info">
            <Image
              cloudName={cloudinaryConfig.cloudName}
              publicId="profile_fuov07"
              width={150}
              height={150}
              alt=""
            />
            <p>{`${firstName} ${lastName}`}</p>
            <p>{email}</p>
            <button
              className="users-cabinet__btn logout-btn"
              type="button"
              onClick={() => {
                dispatch(setUserInfo({}));
              }}
            >
              LOG OUT
            </button>
          </aside>
          <PersonalDataEditForm />
          <PasswordChangeForm />
        </div>
      </section>
    </>
  );
}

export default UsersCabinet;
