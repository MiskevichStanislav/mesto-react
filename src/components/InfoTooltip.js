import OkRegister from "../images/OkRegister.svg";
import NotRegister from "../images/NotRegister.svg";

function InfoTooltip({ onClose, isOpen, status, name }) {
  return (
    <section className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container infoTooltip">
        <button
          type="button"
          className="popup__close button-hover"
          onClick={onClose}
        ></button>
        <img
          className="infoTooltip__image"
          src={status ? OkRegister : NotRegister}
          alt="yes or not registed"
        />
        <p className="infoTooltip__text">
          {status
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </section>
  );
}

export default InfoTooltip;