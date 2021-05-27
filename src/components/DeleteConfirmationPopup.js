import { Popup } from './Popup.js';
export class DeleteConfirmationPopup extends Popup {
  constructor(popupSelector, deleteFunction) {
    super(popupSelector);
    this._deleteForm = this._popup.querySelector('#CardRemoveForm');
    this._deleteFunction = deleteFunction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._deleteFunction(this._data);
    });

  }
  open(data) {
    super.open();
    this._data = data
/*     this.submitButton.textContent = this.submitButton.value
 */  }
}