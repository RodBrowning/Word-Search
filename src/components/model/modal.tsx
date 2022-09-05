import './style.scss';

import React, { useEffect } from 'react';

import ReactDOM from 'react-dom';

const root = document.getElementById('root');
const rootModal = document.getElementById('root-modal');

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<Props> = ({ children, isOpen, setOpenModal }) => {
  if (!isOpen) return null;

  const modalWrapper = document.createElement('div');
  modalWrapper.classList.add('modal-wrapper');
  modalWrapper.style.height = `${root?.offsetHeight}px`;
  modalWrapper.onclick = ({ target }) => {
    if (target === modalWrapper) {
      rootModal!.innerHTML = '';
      setOpenModal(false);
    }
  };

  useEffect(() => {
    rootModal?.appendChild(modalWrapper);
  }, []);

  return ReactDOM.createPortal(children, modalWrapper);
};

export default Modal;
