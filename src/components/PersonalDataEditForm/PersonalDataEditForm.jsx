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
          <label htmlFor="first-name">First Name</label>
          {editing ? <input type="text" name="firstName" id="first-name" /> : <p>{firstName}</p>}
        </li>
        <li className="personal-data__item">
          <label htmlFor="last-name">Last Name</label>
          {editing ? <input type="text" name="lastName" id="last-name" /> : <p>{lastName}</p>}
        </li>
        <li className="personal-data__item">
          <label htmlFor="log-in">Login</label>
          {editing ? <input type="text" name="login" id="log-in" /> : <p>{login}</p>}
        </li>
        <li className="personal-data__item">
          <label htmlFor="e-mail">Email</label>
          {editing ? <input type="text" name="email" id="e-mail" /> : <p>{email}</p>}
        </li>
      </ul>
      {editing ? (
        <div className="personal-data__btns-wrapper">
          <button className="users-cabinet__btn" type="submit">
            Save
          </button>
          <button
            className="users-cabinet__btn"
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
          className="users-cabinet__btn"
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
