import React from 'react';
import ReactDOM from 'react-dom';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmationModal: React.FC<Props> = ({ children, isOpen, setOpenModal }) => {
  if (!isOpen) return null;

  const checkTarget = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target.id === 'confirmation-wrapper') {
      setOpenModal(false);
      return true;
    }
    return false;
  };

  return ReactDOM.createPortal(
    <div
      id="confirmation-wrapper"
      onClick={(e) => {
        checkTarget(e);
      }}
    >
      {children}
    </div>,
    document.getElementById('confirmation-modal')
  );
};

export default ConfirmationModal;
