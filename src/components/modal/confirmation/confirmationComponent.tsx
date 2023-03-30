import './style.scss';
import './style-mobile.scss';

import React from 'react';

interface Props {
  children: React.ReactNode;
  setOpenConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  callbackAction: () => void;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmationComponent: React.FC<Props> = ({
  children,
  setOpenConfirmationModal,
  callbackAction,
  setOpenModal,
}) => {
  return (
    <div className="confirmation-component">
      <div className="children-div">{children}</div>
      <div className="actions-btn">
        <button
          type="button"
          className="action-btn cancel"
          onClick={() => {
            setOpenConfirmationModal(false);
          }}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="action-btn confirm"
          onClick={() => {
            setOpenModal(false);
            callbackAction();
          }}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default ConfirmationComponent;
