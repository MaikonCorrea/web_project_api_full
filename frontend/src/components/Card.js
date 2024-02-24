import React from "react";
import iconDelete from "../images/image_delete.png";
import iconLikeAble from "../images/button_Like_Able.png";
import iconLikeDesable from "../images/button_Like_Desable.png";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `place__button-delete ${
    isOwn ? "place__button-delete_visible" : ""
  }`;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `${
    isLiked ? `${iconLikeAble}` : `${iconLikeDesable}`
  }`;

  return (
    <li className="place" key={props.card._id}>
      <img
        className="place__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={() => handleClick(props.card)}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={() => handleDeleteClick(props.card)}
      >
        <img src={iconDelete} alt="botão para excluir postagem" />
      </button>
      <div className="place__data">
        <h3 className="place__title">{props.card.name}</h3>
        <div className="place__like">
          <button className="place__button-like">
            <img
              src={cardLikeButtonClassName}
              alt="botão para curtir postagem"
              onClick={() => handleLikeClick(props.card)}
            />
          </button>
          <p className="place__like-number">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
