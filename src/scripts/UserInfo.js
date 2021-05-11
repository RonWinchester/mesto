export class UserInfo {
  constructor({ name, job }) {
    this._firstName = document.querySelector(name);
    this._jobProfile = document.querySelector(job);
  }

  getUserInfo(nameInput, jobInput) {
    nameInput.value = this._firstName.textContent;
    jobInput.value = this._jobProfile.textContent;
  }

  setUserInfo({ firstName, JobProfile }) {
    this._firstName.textContent = firstName;
    this._jobProfile.textContent = JobProfile;
  }
}