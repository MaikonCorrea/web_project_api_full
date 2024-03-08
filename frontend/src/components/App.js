import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  useHistory,
} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import DeletePopupCard from "./DeletePopupCard";
import InfoTooltip from "./InfoTooltip";
import CurrentUserContext from "../contexts/CurrentUserContext";
import CurrentCardsContext from "../contexts/CurrentCardsContext";
import clientAPI from "../utils/api";
import * as auth from "../utils/auth";
import "../index.css";

function App() {
  const history = useHistory();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isPopupInfoOpen, setIsPopupInfoOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  useEffect(() => {
    if (token !== null) {
      clientAPI.getUsers().then((users) => {
        setCurrentUser(users);
        setEmailUser(users.email);
      });
      clientAPI.getCards().then((cards) => {
        setCards(cards);
      });
      handleTokenCheck();
    }
  }, []);

  async function handleTokenCheck() {
    try {
      const response = await auth.checkToken(token);
      if (response.status === 201) {
        setIsLoggedIn(true);
        history.push("/profile");
      } else {
        console.log("O status da resposta não é 201:", response.status);
      }
    } catch (error) {
      console.log("Error no check token jwt:", error);
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }

  function handleLogin() {
    setIsLoggedIn(true);
    clientAPI.getCards(localStorage.getItem("jwt")).then((cards) => {
      setCards(cards);
    });
    clientAPI.getUsers(localStorage.getItem("jwt")).then((users) => {
      setCurrentUser(users);
      setEmailUser(users.email);
    });
  }

  async function registerUser(email, password) {
    try {
      const response = await auth.register({ email, password });
      if (response.ok) {
        handleInfoPopup(true);
        history.push("/login");
      } else {
        handleInfoPopup(false);

        if (response.status === 400) {
          console.log(
            "Um dos campos foi preenchido incorretamente:",
            response.status
          );
        } else if (response.status === 401) {
          alert("Não autorizado: Verifique suas credenciais.", response.status);
        } else {
          console.log(
            "Erro desconhecido ao tentar registrar:",
            response.status
          );
        }
      }
    } catch (error) {
      console.error("Erro no registro:", error.message);
    }
  }

  async function loginUser(email, password) {
    try {
      let response = await auth.authorize({ email, password });
      if (!response.ok) {
        handleInfoPopup(false);
        throw new Error("Credenciais inválidas");
      }
      response = await response.json();
      if (response.token) {
        const expirationTimeInHours = 24;
        const expirationTimeInMilliseconds =
          expirationTimeInHours * 60 * 60 * 1000;
        const token = response.token;
        localStorage.setItem("jwt", token);
        handleLogin();
        setTimeout(() => {
          localStorage.removeItem("jwt");
          handleLogout();
          setToken(null);
          history.push("/login");
        }, expirationTimeInMilliseconds);
        history.push("/profile");
      }
    } catch (error) {
      console.error("Erro no login:", error.message);
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setIsDeletePopupOpen(true);
    setCardToDelete(card);
  }

  function handleInfoPopup(params) {
    if (params === false) {
      setIsPopupInfoOpen(true);
      setIsSuccess(false);
    } else {
      setIsPopupInfoOpen(true);
      setIsSuccess(true);
    }
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsPopupInfoOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(updatedUser) {
    renderLoading(true);
    clientAPI
      .profileDescriptionUpdate(updatedUser, localStorage.getItem('jwt'))
      .then((res) => {
        setCurrentUser(res);
        setIsEditProfilePopupOpen(false);
      })
      .catch((error) => {
        console.error("Erro ao atualizar o perfil:", error);
      })
      .finally(() => {
        renderLoading(false);
      });
  }

  function handleUpdateAvatar(onUpdateAvatar) {
    renderLoading(true);
    clientAPI
      .avatarImageUpdate(onUpdateAvatar, localStorage.getItem('jwt'))
      .then((res) => {
        setCurrentUser(res);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((error) => {
        console.error("Erro ao atualizar o avatar:", error);
      })
      .finally(() => {
        renderLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like === currentUser._id);
    console.log(isLiked)
    const apiMethod = isLiked ? "deleteLike" : "addLike";
    clientAPI[apiMethod](card._id, localStorage.getItem('jwt'))
      .then((updatedCard) => {
        console.log(updatedCard)
        const updatedCards = cards.map((c) =>
          c._id === updatedCard._id ? updatedCard : c
        );
        setCards(updatedCards);
      })
      .catch((error) => {
        console.error("Erro ao atualizar a curtida:", error);
      });
  }

  function handleCardDelete() {
    renderLoading(true);
    clientAPI
      .deleteCard(cardToDelete._id, localStorage.getItem('jwt'))
      .then(() => {
        const updatedCards = cards.filter((c) => c._id !== cardToDelete._id);
        setCards(updatedCards);
        setIsDeletePopupOpen(false);
      })
      .finally(() => {
        renderLoading(false);
      });
  }

  function handleAddPlaceSubmit(onAddPlaceSubmit) {
    renderLoading(true);
    clientAPI
      .createCards(onAddPlaceSubmit, localStorage.getItem('jwt'))
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .finally(() => {
        renderLoading(false);
      });
  }

  function renderLoading(isLoading) {
    const textButton = document.querySelector(".loading-button-text");
    const loading = document.querySelector(".loading-container");
    if (isLoading) {
      textButton.classList.add("loading-closed");
      loading.classList.add("loading-opened");
    } else {
      loading.classList.remove("loading-opened");
      textButton.classList.remove("loading-closed");
    }
  }

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        userEmail={emailUser}
      />
      <Switch>
        <Route path="/register">
          <Register
            registerUser={registerUser}
            activeInfo={(params) => {
              handleInfoPopup(params);
            }}
          />
          {isPopupInfoOpen && (
            <InfoTooltip
              isOpen={isPopupInfoOpen}
              onClose={closeAllPopups}
              isSuccess={isSuccess}
            />
          )}
        </Route>
        <Route path="/login">
          <Login
            loginUser={loginUser}
            handleLogout={handleLogout}
            activeInfo={(params) => {
              handleInfoPopup(params);
            }}
          />
          {isPopupInfoOpen && (
            <InfoTooltip
              isOpen={isPopupInfoOpen}
              onClose={closeAllPopups}
              isSuccess={isSuccess}
            />
          )}
        </Route>
        <ProtectedRoute isLoggedIn={isLoggedIn} path="/profile">
          <Route path="/profile">
            <CurrentUserContext.Provider value={currentUser}>
              <CurrentCardsContext.Provider value={cards}>
                <Main
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  onEditProfileClick={handleEditProfileClick}
                  onCardClick={handleCardClick}
                  setCards={setCards}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteCardClick}
                />
                {selectedCard && (
                  <ImagePopup
                    card={selectedCard}
                    isOpen={true}
                    onClose={closeAllPopups}
                  />
                )}
                {isEditAvatarPopupOpen && (
                  <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onSave={handleUpdateAvatar}
                    onUpdateAvatar={handleUpdateAvatar}
                  />
                )}
                {isEditProfilePopupOpen && (
                  <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onSave={handleUpdateUser}
                    onUpdateUser={handleUpdateUser}
                  />
                )}
                {isAddPlacePopupOpen && (
                  <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                  />
                )}
                {isDeletePopupOpen && (
                  <DeletePopupCard
                    isOpen={isDeletePopupOpen}
                    onClose={() => setIsDeletePopupOpen(false)}
                    handleCardDelete={() => {
                      handleCardDelete();
                    }}
                  />
                )}
                <Footer />
              </CurrentCardsContext.Provider>
            </CurrentUserContext.Provider>
          </Route>
        </ProtectedRoute>
        <Route path="/">
          {isLoggedIn ? <Redirect to="/profile" /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </>
  );
}

export default withRouter(App);
