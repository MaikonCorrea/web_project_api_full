import React, { useState, useEffect } from "react";
import imageError from "../images/image_error.png";
import imageOk from "../images/image_ok.png";

function InfoTooltip({ isSuccess, onClose, isOpen }) {
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

  return (
    <div
      className={`info ${shouldRenderPopup ? "info__popup_opened" : ""}${
        isClosing ? "info__popup_closing" : ""
      }`}
      onClick={handleOverlayClick}
    >
      <div className="info__popup">
        {isSuccess ? (
          <img className="info__image" src={imageOk} alt="imagem de sucesso" />
        ) : (
          <img className="info__image" src={imageError} alt="imagem de erro" />
        )}
        {isSuccess ? (
          <p className="info__description">
            Vitória! Agora você precisa fazer o login.
          </p>
        ) : (
          <p className="info__description">
            Ops, algo deu errado! Por favor, tente novamente.
          </p>
        )}
        <button
          className="info__button-close-popup button__close-popup"
          onClick={handleOverlayClick}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
