import React, { useState } from "react";
import { Link } from "react-router-dom";
const Register = ({ onRegister }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log("логин:", state);
    if (onRegister) {
      const {email, password} = state;
      onRegister({email, password});
    } 
    console.log("state:", state);
      
      onRegister({
        email: state.email, 
        password: state.password});
  }

  return (
    <div className="register">
      <p className="register__title">Регистрация</p>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          className="register__input"
          required
          id="email"
          name="email"
          type="email"
          value={state.email || ""}
          onChange={handleChange}
          placeholder="Email"
        />
        <span id="register-email-error" className="error"></span>
        <input
          className="register__input"
          required
          id="password"
          name="password"
          type="password"
          value={state.password || ""}
          onChange={handleChange}
          placeholder="Пароль"
          autoComplete="on"
        />
        <span id="register-password-error" className="error"></span>

        <button type="submit" className="register__button-container">
          Зарегистрироваться
        </button>
      </form>
      <div className="register__signin">
        <Link to="/sign-in" className="register__login-link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </div>
  );
};
export default Register;