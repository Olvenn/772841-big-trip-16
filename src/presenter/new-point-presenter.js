import {UserAction, UpdateType} from '../consts.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import EditView from '../view/edit-view';

export default class NewPointPresenter {
  #tripContainer = null;
  #changeData = null;
  #pointEditComponent = null;

  constructor(tripContainer, changeData) {
    this.#tripContainer = tripContainer;
    this.#changeData = changeData;
  }

  init = (point, destination, offers) => {

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditView(point, destination, offers);

    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);
    this.#pointEditComponent.setCloseFormHandler(this.#handleDeleteClick);

    document.addEventListener('keydown', this.#escKeyDownHandler);

    render(this.#tripContainer, this.#pointEditComponent, RenderPosition.AFTERBEGIN);
  }

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }


  #escKeyDownHandler = (evt) => {

    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
    this.#setAddButtonBlock(false);
  }

  #handleDeleteClick = () => {
    this.destroy();
    this.#setAddButtonBlock(false);
  };

  setSaving = () => {
    this.#pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting = () => {
    this.#setAddButtonBlock(false);
    const resetFormState = () => {
      this.#pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #setAddButtonBlock = (isDisabled) => {
    document.querySelector('.trip-main__event-add-btn').disabled = isDisabled;
  }

  #handleFormSubmit = (point) => {
    this.#setAddButtonBlock(false);
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point,
    );
  }
}

