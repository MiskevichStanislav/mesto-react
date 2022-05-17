import { useState } from "react";

function Login({ onLogin }) {
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
    onLogin(email, password);
  }

  return (
    <div className="register">
      <div className="register__content">
        <p className="register__title">Вход</p>
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
          <button className="register__button button-hover">Войти</button>
        </form>
      </div>
    </div>
  );
}

export default Login;