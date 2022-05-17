import { Link, withRouter } from "react-router-dom";
import { React, useState } from "react";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  return (
    <div className="register">
      <div className="register__content">
        <h3 className="register__title">Регистрация</h3>
        <form className="register__form" type="submit" onSubmit={handleSubmit}>
          <input
            className="register__form-field"
            type="email"
            placeholder="Email"
            onChange={handleEmailChange}
            required
          />
          <input
            className="register__form-field"
            type="password"
            placeholder="Пароль"
            onChange={handlePasswordChange}
            required
          />
          <button className="register__button button-hover">
            Зарегистрироваться
          </button>
        </form>
        <span className="register__already">
          Уже зарегистрированы?
          <Link to="/sign-in" className="register__log-in button-hover">
            {" "}
            Войти
          </Link>
        </span>
      </div>
    </div>
  );
};

export default withRouter(Register);