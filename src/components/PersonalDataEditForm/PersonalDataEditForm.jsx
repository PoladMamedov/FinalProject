import { useState } from "react";
import { useSelector } from "react-redux";

function PersonalDataEditForm() {
      // eslint-disable-next-line object-curly-newline
  const { firstName, lastName, login, email } = useSelector((state) => state.user.userInfo);
  const [editing, setEditing] = useState(false);
  return (
    <form className="personal-data">
      <ul className="personal-data__list">
        <li className="personal-data__item">
          <label htmlFor="">First Name</label>
          {editing ? <input type="text" name="firstName" /> : <p>{firstName}</p>}
        </li>
        <li className="personal-data__item">
          <label htmlFor="">Last Name</label>
          {editing ? <input type="text" name="lastName" /> : <p>{lastName}</p>}
        </li>
        <li className="personal-data__item">
          <label htmlFor="">Login</label>
          {editing ? <input type="text" name="login" /> : <p>{login}</p>}
        </li>
        <li className="personal-data__item">
          <label htmlFor="">Email</label>
          {editing ? <input type="text" name="email" /> : <p>{email}</p>}
        </li>
      </ul>
      {editing ? (
        <div className="personal-data__btns-wrapper">
          <button className="personal-data__btn" type="submit">
            Save
          </button>
          <button
            className="personal-data__btn"
            type="button"
            onClick={() => {
              setEditing(false);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="personal-data__btn"
          onClick={() => {
            setEditing(true);
          }}
        >
          Edit
        </button>
      )}
    </form>
  );
}

export default PersonalDataEditForm;
