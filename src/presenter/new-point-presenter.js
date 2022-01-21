import EditView from '../view/edit-view';

import {render, RenderPosition, remove} from '../utils/render.js';
import {UserAction, UpdateType} from '../consts.js';

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

    // this.#pointEditComponent.setOnEditPointClick(this.#handleDeleteClick);

    render(this.#tripContainer, this.#pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.escKeydownHandler);

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
  }

  #handleDeleteClick = () => {
    this.destroy();
  };

  setSaving = () => {
    this.#pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting = () => {
    const resetFormState = () => {
      this.#pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point,
    );
    // this.destroy();
  }
}

