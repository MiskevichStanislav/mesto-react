//import { useState, useEffect } from "react";
import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import Footer from "./Footer.js";
import { api } from "../utils/Api";
import * as auth from "./../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";


function App() {
  
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [registrationResult, setRegistrationResult] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard({
      isOpened: true,
      name: card.name,
      link: card.link,
    });
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltip(false);
    setSelectedCard({ ...selectedCard, isOpened: false });
  }

  useEffect(() => {
    api
      .getProfile()
      .then((res) => setCurrentUser(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .getCards()
      .then((cards) => setCards(cards))
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    
    const changeLikeCardStatus = !isLiked
      ? api.addLike(card._id)
      : api.deleteLike(card._id);
    changeLikeCardStatus
      .then((newCard) => {
        setCards((item) => item.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(`Ошибка ${err}`));
  }

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`))
      .finally(() => {});
  };

  const handleUpdateUser = (name, about) => {
    api
      .editProfile(name, about)
      .then((item) => {
        setCurrentUser(item);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`))
      .finally(() => {});
  };
  const handleEditAvatar = (avatar) => {
    api
      .editAvatar(avatar.avatar)
      .then((item) => {
        setCurrentUser(item);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`))
      .finally(() => {});
  };
  // const handleAddPlaceSubmit = (name, link) => {
  //   api
  //     .addCard(name, link)
  //     .then((newCard) => {
  //       setCards([newCard, ...cards]);
  //       closeAllPopups();
  //     })
  //     .catch((err) => console.log(`Ошибка ${err}`))
  //     .finally(() => {});
  // };
  const handleRegister = (email, password) => {
    auth.register(email, password)
  };
  // function handleRegister(password, email) {
  //   console.log(password, email);
  //   auth
  //     .register(password, email)
  //     .then((res) => {
  //       setIsInfoTooltip(true);
  //       if (res) {
  //         setMessage(true);
  //         history.push("/sign-in");
  //       }
  //     })
  //     .catch(() => {
  //       setMessage(false);
  //       setIsInfoTooltip(true);
  //     });
  // }
  // function handleLogin(email, password) {
  //   console.log(password, email);
  //   auth
  //     .login(password, email)
  //     .then((res) => {
  //       if (res) {
  //         //console.log(res)
  //         setIsLoggedIn(true);
  //         setUserEmail(email);
  //         history.push("/");
  //         localStorage.setItem("jwt", res.token);
  //       }
  //     })
  //     .catch(() => {
  //       setMessage(false);
  //       setIsInfoTooltip(true);
  //     });
  // }

  // function handleSignOut() {
  //   localStorage.removeItem("jwt");
  //   console.log('выйти')
  //   history.push("/sign-in");
  //   setIsLoggedIn(false);
  // }

  return (

    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">

    <Header />
        <Routes>
          <Route
            path="/" exact
            element={
              <ProtectedRoute
                exact
                loggedIn={loggedIn}
                component={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          ></Route>

            <Route
            path="/sign-up"
            element={<Register 
              onRegister={handleRegister} 
              />
            }
          ></Route>

          <Route path="/sign-in" element={<Login />}>
          </Route>
          <Route
            exact
            path="/"
            element={
              loggedIn ? <Navigate to="/sign-in" /> : <Navigate to="/sign-up" />
            }
          ></Route>
        </Routes>

        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleEditAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          />
        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          buttonText="Да"
        ></PopupWithForm>
        <InfoTooltip
          name="InfoTooltip"
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          registrationResult={registrationResult}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
          