import './style.scss';
import './style-mobile.scss';

import React from 'react';

interface Props {
  children: React.ReactNode;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  callbackAction: () => void;
}

const InformationComponent: React.FC<Props> = ({ children, setOpenModal, callbackAction }) => {
  return (
    <div className="information-component">
      <div className="children-div">{children}</div>
      <div className="actions-btn">
        <button
          type="button"
          className="action-btn confirm"
          onClick={() => {
            callbackAction();
            setOpenModal(false);
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default InformationComponent;
