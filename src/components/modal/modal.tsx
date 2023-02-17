import './style.scss';

import React from 'react';
import ReactDOM from 'react-dom';

const rootModal = document.getElementById('root-modal');

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<Props> = ({ children, isOpen, setOpenModal }) => {
  if (!isOpen) return null;

  const checkTarget = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target.id === 'modal-wrapper') setOpenModal(false);
  };

  return ReactDOM.createPortal(
    <div
      id="modal-wrapper"
      onClick={(e) => {
        checkTarget(e);
      }}
    >
      {children}
    </div>,
    document.getElementById('root-modal')
  );
};

export default Modal;
