import { useState } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import Footer from "./Footer.js";


function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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
    setSelectedCard(false);
  }

  return (

    <div className="page">

    <Header />

    <Main 
    onEditAvatar={handleEditAvatarClick}
    onEditProfile={handleEditProfileClick} 
    onAddPlace={handleAddPlaceClick} 
    onCardClick={handleCardClick}
    />
    
  <Footer />

  <PopupWithForm  
  name="formEdit" 
  isOpen={isEditProfilePopupOpen}
  title="Редактировать профиль" 
  formName="formEdit"
  buttonText="Сохранить"
  onClose={closeAllPopups}
  >
  
  <input type="text" id="name-input" name="name" className="popup__input popup__input-name" placeholder="Напишите ваше имя" minLength="2" maxLength="40" required />
  <span className="name-input-error popup__error"></span>
  <input type="text" id="detail-input" name="detail" className="popup__input popup__input-detail" placeholder="Расскажите о себе" minLength="2" maxLength="200" required />
  <span className="detail-input-error popup__error"></span>
  </PopupWithForm>

  
<PopupWithForm 
name="formAdd" 
isOpen={isEditAvatarPopupOpen}
title="Обновить автар"
 formName="formAdd"
 buttonText="Сохранить"
onClose={closeAllPopups}
>
  <input type="url" id="urlAvatar-input" name="link" className="popup__input popup__input-avatar" placeholder="Ссылка на фотографию" required />
  <span className="urlAvatar-input-error popup__error"></span>
  </PopupWithForm>



<PopupWithForm 
name="formAddCard" 
isOpen={isAddPlacePopupOpen}
title="Новое место" 
formName="formAddCard"
buttonText="Создать"
onClose={closeAllPopups}
>
  <input type="text" id="card-input" name="card" className="popup__input popup__input_card-name" placeholder="Как называется ваше место" minLength="2" maxLength="30" required />
  <span className="card-input-error popup__error"></span>
  <input type="url" id="url-input" name="link" className="popup__input popup__input-link" placeholder="Ссылка на фотографию" required />
  <span className="url-input-error popup__error"></span>
  </PopupWithForm>


<PopupWithForm
 name="formDelete" 
title="Вы уверены?"
id="popup__form popup__form_add" 
formName="formDelete"
buttonText="Да"
onClose={closeAllPopups}
>
    <input name="formDelete" className="popup__form popup__form_add"/>
    </PopupWithForm>


<ImagePopup 
card={selectedCard} 
 onClose={closeAllPopups}/>
</div>
);
}
export default App;