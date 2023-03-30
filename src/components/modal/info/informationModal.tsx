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

  return ReactDOM.createPortal(
    <div
      id="information-wrapper"
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target.id! === 'information-wrapper') {
          if (callbackAction) {
            callbackAction();
          }
          setOpenModal(false);
        }
      }}
    >
      {children}
    </div>,
    document.getElementById('information-modal')!
  );
};

export default InformationModal;
