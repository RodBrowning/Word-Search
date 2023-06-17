import './style.scss';

import React from 'react';
import ReactDOM from 'react-dom';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<Props> = ({ children, isOpen, setOpenModal }) => {
  if (!isOpen) return null;

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    if (target.id! === 'modal-wrapper') {
      closeModal();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.currentTarget.id !== 'modal-wrapper') return;
    if (event.key === 'Enter' || event.key === ' ') {
      closeModal();
    }
  };

  return ReactDOM.createPortal(
    <div id="modal-wrapper" onClick={handleClick} onKeyDown={handleKeyDown} role="button" tabIndex={0}>
      {children}
    </div>,
    document.getElementById('root-modal')!
  );
};

export default Modal;
