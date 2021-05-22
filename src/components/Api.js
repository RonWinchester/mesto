export class Api {
  constructor({ adress, token, groupId }) {
    this._adress = adress,
      this._token = token,
      this._groupId = groupId
  }

  getUserInformation() {
    return fetch(`${this._adress}${this._groupId}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        return res.ok ? res.json() : Promise.reject(`${res.status}`)
      })
  }

  patchUserInformation(data) {
    return fetch(`${this._adress}${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
      .then(result => {
        result.ok ? result.json() : Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  getCards() {
    return fetch(`${this._adress}${this._groupId}/cards/`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        return res.ok ? res.json() : Promise.reject(`${res.status}`)
      })
  }

  postCard({name, link}) {
    return fetch(`${this._adress}${this._groupId}/cards/`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        link: link,
        name: name
      })
    })
      .then(res => {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      })
  }

}

