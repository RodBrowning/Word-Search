/* eslint-disable sort-imports */
import './style.scss';
import './style-mobile.scss';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetGame, generateNewBoardData } from '../../../features/game/gameSlice';
import ConfirmationModal from '../confirmation/confirmationModal';
import ConfirmationComponent from '../confirmation/confirmationComponent';

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfigModal: React.FC<Props> = ({ setOpenModal }) => {
  const [openResetConfirmationModal, setOpenResetConfirmationModal] = useState(false);
  const dispatch = useDispatch();

  const dispatchResetGame = () => {
    dispatch(resetGame());
    dispatch(generateNewBoardData());
  };

  return (
    <div className="config-panel show-config">
      <div className="level">
        <h5>Dificuldade</h5>
        <button type="button">Fácil</button>
        <button type="button" className="selected">
          Médio
        </button>
        <button type="button">Difícil</button>
      </div>
      <div className="word-list">
        <h5>Lista de palavras</h5>
        <button type="button" className="toggle-button">
          Usar Custom
        </button>
        <p>Separe com espaço ou virgula.</p>
        <p>Mínimo 10 palavras.</p>
        <textarea name="word-list" id="word-list" cols={10} rows={8} />
      </div>
      <div className="subject">
        <h5>Tema</h5>
        <div className="options">
          <button type="button">Animais</button>
          <button type="button" className="selected">
            Carros
          </button>
          <button type="button">Esportes</button>
          <button type="button">Nomes</button>
          <button type="button">Bíblicos</button>
          <button type="button">Peixes</button>
          <button type="button">Marcas</button>
          <button type="button">Aves</button>
        </div>
      </div>
      <div className="reset-game">
        <button
          type="button"
          className="reset-game-button"
          onClick={() => {
            setOpenResetConfirmationModal(true);
          }}
        >
          Reiniciar Placar
        </button>
        <ConfirmationModal isOpen={openResetConfirmationModal} setOpenModal={setOpenResetConfirmationModal}>
          <ConfirmationComponent
            setOpenConfirmationModal={setOpenResetConfirmationModal}
            dispatchAction={dispatchResetGame}
            setOpenModal={setOpenModal}
          >
            <h5>Não será possível recuperar o progresso após esta ação.</h5>
            <h5>Deseja prosseguir?</h5>
          </ConfirmationComponent>
        </ConfirmationModal>
      </div>
    </div>
  );
};

export default ConfigModal;
