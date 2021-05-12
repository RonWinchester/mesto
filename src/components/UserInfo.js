export class UserInfo {
  constructor({ name, job }) {
    this._firstName = document.querySelector(name);
    this._jobProfile = document.querySelector(job);
  }

  getUserInfo() {
    const userProfileData = {
      name: this._firstName.textContent,
      job: this._jobProfile.textContent
    }
    return userProfileData
  }

  setUserInfo({ firstName, JobProfile }) {
    this._firstName.textContent = firstName;
    this._jobProfile.textContent = JobProfile;
  }
}