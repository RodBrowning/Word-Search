import React from 'react';
import ReactDOM from 'react-dom';

const confirmationModal = document.getElementById('confirmation-modal');

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmationModal: React.FC<Props> = ({ children, isOpen, setOpenModal }) => {
  confirmationModal!.replaceChildren();
  if (!isOpen) return null;

  const confirmationWrapper = document.createElement('div');
  confirmationWrapper.setAttribute('id', 'confirmation-wrapper');
  confirmationWrapper.onclick = ({ target }) => {
    if (target === confirmationWrapper) {
      setOpenModal(false);
    }
  };
  confirmationModal?.appendChild(confirmationWrapper);

  return ReactDOM.createPortal(children, confirmationWrapper);
};

export default ConfirmationModal;
