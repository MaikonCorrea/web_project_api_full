import React, { useEffect, useState } from "react";

function ImagePopup({ card, isOpen, onClose }) {
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
    };

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
  };
  return (
    <div
      className={`screen ${shouldRenderPopup ? "screen__image_opened" : ""} ${
        isClosing ? "screen__image_closing" : ""
      }`}
      onClick={handleOverlayClick}
    >
      <div className="screen__image-popup">
        <button
          className={`screen__button-close-popup button-close-popup`}
          onClick={handleOverlayClick}
        ></button>
        <img
          className="screen__image-dynamics"
          src={card.link}
          alt={card.name}
        />
        <h3 className="screen__popup-title">{card.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
