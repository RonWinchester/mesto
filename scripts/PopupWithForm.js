import { Popup } from './Popup.js'
export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    const values = {};
    const inputs = [...this._form.querySelectorAll('.form__input')]
    inputs.forEach(input => {
      values[input.name] = input.value
    })
    return values
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._popupSelector.querySelector('.form');
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    })
  }

  close() {
    this._form.reset();
    super.close();
  }
}