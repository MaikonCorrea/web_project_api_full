import React, { useState, useEffect } from "react";

function DeletePopupCard({ isOpen, onClose, handleCardDelete }) {
  const [shouldRenderPopup, setShouldRenderPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape" && isOpen) {
        setIsClosing(true);

        setTimeout(() => {
          setIsClosing(true);
          onClose();
        }, 200);
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);

      const timeoutId = setTimeout(() => {
        setShouldRenderPopup(true);
      }, 150);

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      setIsClosing(true);
      setShouldRenderPopup(false);

      const timeoutId = setTimeout(() => {
        setIsClosing(false);
      }, 150);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isOpen]);

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      event.preventDefault();
      setIsClosing(true);
      setTimeout(() => {
        onClose();
      }, 150);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleCardDelete();
  }

  return (
    <form
      className={`delete ${shouldRenderPopup ? "popup_opened" : ""} ${
        isClosing ? "popup_closing" : ""
      }`}
      name="delete"
      onClick={handleOverlayClick}
    >
      <div className="delete__popup">
        <h2 className="delete__popup-title">Tem certeza?</h2>
        <button
          name="button"
          className="delete__button-save"
          id="delete-button"
          type="submit"
          onClick={handleSubmit}
        >
          <span className={`loading-button-text`}>Salvar</span>
          <span className={`loading-container`}>
            Salvando...
            <span className={`loading-animation`}></span>
          </span>
        </button>
        <button
          className="delete__button-close-popup button-close-popup"
          onClick={handleOverlayClick}
        ></button>
      </div>
    </form>
  );
}

export default DeletePopupCard;
