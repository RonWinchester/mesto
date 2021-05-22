export class UserInfo {
  constructor({ name, about, avatar }) {
    this._firstName = document.querySelector(name);
    this._jobProfile = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const userProfileData = {
      name: this._firstName.textContent,
      about: this._jobProfile.textContent,
    }
    return userProfileData
  }

  setUserInfo(data) {
    this._firstName.textContent = data.name;
    this._jobProfile.textContent = data.about;
  }

  setUserAvatar({avatar}){
    this._avatar.src = avatar
  }

}