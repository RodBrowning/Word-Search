import React from 'react';
import ReactDOM from 'react-dom';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmationModal: React.FC<Props> = ({ children, isOpen, setOpenModal }) => {
  if (!isOpen) return null;

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    if (target.id! === 'confirmation-wrapper') closeModal();
  };

  const handleKeyDown = (event: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      closeModal();
    }
  };

  return ReactDOM.createPortal(
    <div id="confirmation-wrapper" onClick={handleClick} onKeyDown={handleKeyDown} role="button" tabIndex={0}>
      {children}
    </div>,
    document.getElementById('confirmation-modal')!
  );
};

export default ConfirmationModal;
