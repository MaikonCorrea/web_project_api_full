import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const isValueValid = isNameValid && isDescriptionValid;

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [isOpen, currentUser]);

  function handleNameChange(e) {
    const newName = e.target.value;
    setName(newName);
    setIsNameValid(newName.length >= 2 && newName.length <= 30);
  };

  function handleDescriptionChange(e) {
    const newDescription = e.target.value;
    setDescription(newDescription);
    setIsDescriptionValid(newDescription.length >= 2 && newDescription.length <= 200);  
  };

  function escapeHTML(text) {
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function handleSubmit() {
    onUpdateUser({
      name: escapeHTML(name),
      about: escapeHTML(description),
    });
  };



  return (
    <PopupWithForm
      name="edit"
      title="Editar perfil"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValueValid={isValueValid}
    >
      <input
        className="edit__input-name edit__input-name:focus"
        type="text"
        name="name"
        placeholder="Nome"
        value={name}
        onChange={handleNameChange}
        maxLength={30}
      />
      <span className="span span_name-message">
      {!isNameValid && "O nome deve conter mais de 2 e menos de 30 caracteres"}
      </span>
      <input
        className="edit__input-about"
        type="text"
        name="about"
        placeholder="Sobre mim"
        value={description}
        onChange={handleDescriptionChange}
        maxLength={200}
      />
      <span className="span span_about-message">
        {!isDescriptionValid && "A descrição deve conter mais de 2  e menos de 200 caracteres"}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
