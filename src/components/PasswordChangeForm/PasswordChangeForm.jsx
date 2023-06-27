function PasswordChangeForm() {
  // eslint-disable-next-line object-curly-newline
  return (
    <form className="password-form">
      <ul className="password-form__list">
        <li className="password-form__item">
          <label htmlFor="curr-password">Current password</label>
          <input type="text" name="currPassword" id="curr-password" />
        </li>
        <li className="password-form__item">
          <label htmlFor="new-password">New password</label>
          <input type="text" name="newPassword" id="new-password" />
        </li>
        <li className="password-form__item">
          <label htmlFor="confirm-new-password">Confirm new password</label>
          <input type="text" name="confirmNewPassword" id="confirm-new-password" />
        </li>
      </ul>
      <button type="button" className="users-cabinet__btn" onClick={() => {}}>
        Confirm
      </button>
    </form>
  );
}

export default PasswordChangeForm;
