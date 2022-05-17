import React from "react";
import logo from "../images/logo-white.svg";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router";

function Header({ email, onSignOut }) {
  const location = useLocation();
  const isLocationSignIn = location.pathname === "/sign-in";
  const isLocationMain = location.pathname === "/";
  const isLocationSignUp = location.pathname === "/sign-up";
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Логотип Место" />
        <div className="heaqer__contant">
        <p className="header__user-email">{email}</p>
          
            <Link 
            to={
              isLocationSignUp ? "/sign-in" : isLocationSignIn ? "/sign-up" : "/sign-in"
            }
            className="header__button button-hover"
            onClick={isLocationMain ? onSignOut : () => {}}
          >
          {
            isLocationSignUp ? "Войти" : isLocationSignIn ? "Регистрация" : "Выйти"
            }
             
            </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;