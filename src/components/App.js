import { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import Footer from "./Footer.js";
import { api } from "../utils/Api";
import * as auth from "./../utils/Auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";


function App() {
  
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [message, setMessage] = useState(false);
  const [userEmail, setUserEmail] = useState("");

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
  const handleAddPlaceSubmit = (name, link) => {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка ${err}`))
      .finally(() => {});
  };

  function handleRegister(password, email) {
    console.log(password, email);
    auth
      .register(password, email)
      .then((res) => {
        setIsInfoTooltip(true);
        if (res) {
          setMessage(true);
          history.push("/sign-in");
        }
      })
      .catch(() => {
        setMessage(false);
        setIsInfoTooltip(true);
      });
  }
  function handleLogin(email, password) {
    console.log(password, email);
    auth
      .login(password, email)
      .then((res) => {
        if (res) {
          //console.log(res)
          setIsLoggedIn(true);
          setUserEmail(email);
          history.push("/");
          localStorage.setItem("jwt", res.token);
        }
      })
      .catch(() => {
        setMessage(false);
        setIsInfoTooltip(true);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    console.log('выйти')
    history.push("/sign-in");
    setIsLoggedIn(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={usermail} onSignOut={handleSignOut} />
        <Switch>
        <ProtectedRoute
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            component={Main}
            exact
            path="/"
            isLoggedIn={isLoggedIn}
          />
          <ProtectedRoute
            component={Footer}
            exact
            path="/"
            isLoggedIn={isLoggedIn}
          />
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>

          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
            </Route>
          
          <Route>
          {!isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
          </Switch>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonSubmitText={submitTextProfilePopup}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonSubmitText={submitTextAddPlacesPopup}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleEditAvatar}
        />
       
        <ImagePopup 
        selectedCard={selectedCard} 
        onClose={closeAllPopups} 
        />

        <InfoTooltip
          name="info-toltip"
          onClose={closeAllPopups}
          isOpen={isInfoTooltip}
          status={message}
        />

       </CurrentUserContext.Provider>
      </div>
  );
}

export default App;