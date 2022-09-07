import './style.scss';
import './style-mobile.scss';

import React from 'react';

interface Props {
  children: React.ReactNode;
  setOpenConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  dispatchAction: Function;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmationComponent: React.FC<Props> = ({
  children,
  setOpenConfirmationModal,
  dispatchAction,
  setOpenModal,
}) => {
  return (
    <div className="confirmation-component">
      <div className="children-div">{children}</div>
      <div className="actions-btn">
        <button
          type="button"
          className="cancel"
          onClick={() => {
            setOpenConfirmationModal(false);
          }}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="confirm"
          onClick={() => {
            setOpenModal(false);
            dispatchAction();
          }}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default ConfirmationComponent;
