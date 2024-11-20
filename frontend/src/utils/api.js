 export class Api {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
    this._token = token;
  }
  

  _fetch(url, options, token = this._token) {
    const fullUrl = `${this._baseUrl}${url}`;
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${token || this._token}`,
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

  getUsers(token) {
    return this._fetch("/users/me", { method: "GET" }, token);
    
  }

  getCards(token) {
    return this._fetch("/cards", { method: "GET" }, token );
  }

  createCards(data, token) {
    return this._fetch("/cards", {
      method: "POST",
      body: JSON.stringify(data),
    }, token);
  }

  profileDescriptionUpdate(data, token) {
    return this._fetch("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    }, token);
  }
  
 avatarImageUpdate(data, token) {
    return this._fetch(`/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }, token);
  }

  deleteCard(idItem, token) {
    return this._fetch(`/cards/${idItem}`, { method: "DELETE" }, token);
  }

  deleteLike(idItem, token) {
    return this._fetch(`/cards/likes/${idItem}`, { method: "DELETE" }, token);
  }

  addLike(idItem, token) {
    return this._fetch(`/cards/likes/${idItem}`, { method: "PUT" }, token);
  }

}

const apiInstance = new Api({
  baseUrl: process.env.REACT_APP_BASE_URL,
  token: localStorage.getItem('jwt'),
});

export default apiInstance;



