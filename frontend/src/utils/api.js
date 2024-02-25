 export class Api {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _fetch(url, options) {
    const fullUrl = `${this._baseUrl}${url}`;
    const headers = {
      "Content-Type": "application/json",
      authorization: this._token,
    };

    const mergedOptions = { headers, ...options };

    return fetch(fullUrl, mergedOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(`Falha na solicitação com status ${err.status}`);
      });
  }

  getUsers() {
    return this._fetch("/users/me", { method: "GET" });
  }

  getCards() {
    return this._fetch("/cards", { method: "GET" });
  }

  createCards(data) {
    return this._fetch("/cards", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  profileDescriptionUpdate(data) {
    return this._fetch("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }
  
 avatarImageUpdate(data) {
    return this._fetch(`/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  deleteCard(idItem) {
    return this._fetch(`/cards/${idItem}`, { method: "DELETE" });
  }

  deleteLike(idItem) {
    return this._fetch(`/cards/likes/${idItem}`, { method: "DELETE" });
  }

  addLike(idItem) {
    return this._fetch(`/cards/likes/${idItem}`, { method: "PUT" });
  }

}

export default new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_ptbr_05",
  token: "e2bad784-3e1f-478a-b640-635d640e7341",
});


