import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/actions/user";
import PersonalDataEditForm from "../../components/PersonalDataEditForm/PersonalDataEditForm";

function UsersCabinet() {
  const dispatch = useDispatch();

  return (
    <>
      <section className="users-cabinet">
        <div className="container">
          <h2 className="section-title">Personal data</h2>
          <PersonalDataEditForm />
          <h2 className="section-title">Password</h2>
          <button
            className="users-cabinet__logout-btn"
            type="button"
            onClick={() => {
              dispatch(setUserInfo({}));
            }}
          >
            LOG OUT
          </button>
        </div>
      </section>
    </>
  );
}

export default UsersCabinet;
