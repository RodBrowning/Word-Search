import './style.scss';

import React from 'react';
import ReactDOM from 'react-dom';

const rootModal = document.getElementById('root-modal');
const confirmationModal = document.getElementById('confirmation-modal');

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<Props> = ({ children, isOpen, setOpenModal }) => {
  rootModal!.replaceChildren();
  confirmationModal!.replaceChildren();
  if (!isOpen) return null;

  const modalWrapper = document.createElement('div');
  modalWrapper.setAttribute('id', 'modal-wrapper');
  modalWrapper.onclick = ({ target }) => {
    if (target === modalWrapper) {
      setOpenModal(false);
    }
  };
  rootModal?.appendChild(modalWrapper);

  return ReactDOM.createPortal(children, modalWrapper);
};

export default Modal;
