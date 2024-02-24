import React from "react";
import Card from "./Card";
import contentImageEdit from "../images/VectorEditImage.png";
import contentImageInclude from "../images/vectoradd.png";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const hasCards = Boolean(cards.length);

  return (
    <>
      <section className="profile">
        <button
          className="profile__button-edit-image"
          type="button"
          onClick={onEditAvatarClick}
        >
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="imagem de perfil do usuário"
          />
        </button>
        <div className="profile__info">
          <p className="profile__info-name" id="profileName">
            {currentUser.name}
          </p>
          <button
            className="profile__button-info"
            onClick={onEditProfileClick}
            type="button"
          >
            <img
              className="profile__image-button-info"
              src={contentImageEdit}
              alt="botão para alterar perfil"
            />
          </button>
          <p className="profile__info-discription">{currentUser.about}</p>
        </div>
        <button
          className="profile__button-include"
          onClick={onAddPlaceClick}
          type="button"
        >
          <img
            src={contentImageInclude}
            alt="botão para adicionar nava imagem"
          />
        </button>
      </section>

      {hasCards && (
        <ul className="gallery">
          {cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      )}
    </>
  );
}
