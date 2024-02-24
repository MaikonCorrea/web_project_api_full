import React, { useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInputRef = useRef(null);
  const [avatarError, setAvatarError] = useState("");
  const [isValueValid, setIsValueValid] = useState(false);

  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  function handleSubmit() {
    const avatarSrc = avatarInputRef.current.value;
    onUpdateAvatar({
      avatar: avatarSrc,
    });
  };

  function handleChange() {
    const avatarSrc = avatarInputRef.current.value;
    if (!avatarSrc || !urlRegex.test(avatarSrc)) {
      setAvatarError('digite uma URL válida!"');
      setIsValueValid(false);
    } else {
      setAvatarError("");
      setIsValueValid(true);
    }
  };

  return (
    <PopupWithForm
      name="photograph"
      title="Alterar a foto do perfil"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValueValid={isValueValid}
    >
      <input
        className="photograph__input-link input"
        type="url"
        name="urlPhoto"
        placeholder="URL da imagem"
        ref={avatarInputRef}
        onChange={handleChange}
      ></input>
      <span className="span span_urlPhoto-message">{avatarError}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
