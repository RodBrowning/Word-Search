import React from 'react';
import ReactDOM from 'react-dom';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  callbackAction?: () => void;
}

const InformationModal: React.FC<Props> = ({ children, isOpen, setOpenModal, callbackAction }) => {
  if (!isOpen) return null;

  const closeModal = () => {
    if (callbackAction) {
      callbackAction();
    }
    setOpenModal(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;
    if (target.id! === 'information-wrapper') {
      closeModal();
    }
  };

  const handleKeyDown = (event: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      closeModal();
    }
  };

  return ReactDOM.createPortal(
    <div id="information-wrapper" onClick={handleClick} onKeyDown={handleKeyDown} role="button" tabIndex={0}>
      {children}
    </div>,
    document.getElementById('information-modal')!
  );
};

InformationModal.defaultProps = {
  callbackAction: () => {},
};

export default InformationModal;
