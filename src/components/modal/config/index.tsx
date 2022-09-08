import './style.scss';
import './style-mobile.scss';

import React, { useState } from 'react';
import { generateNewBoardData, resetGame } from '../../../features/game/gameSlice';

import ConfirmationComponent from '../confirmation/confirmationComponent';
import ConfirmationModal from '../confirmation/confirmationModal';
// eslint-disable-next-line import/order
import { useDispatch } from 'react-redux';

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
        <label htmlFor="easy">
          <input type="radio" name="difficulty-radio" id="easy" />
          <button type="button">Fácil</button>
        </label>
        <label htmlFor="normal">
          <input type="radio" name="difficulty-radio" id="normal" />
          <button type="button">Médio</button>
        </label>
        <label htmlFor="hard">
          <input type="radio" name="difficulty-radio" id="hard" />
          <button type="button">Difícil</button>
        </label>
      </div>
      <div className="word-list">
        <h5>Lista de palavras</h5>
        <label htmlFor="use-custom">
          <input type="checkbox" name="custom-checkbox" id="use-custom" />
          <button type="button" className="toggle-button">
            Usar Custom
          </button>
        </label>
        <p>Separe com espaço ou virgula.</p>
        <p>Mínimo 10 palavras.</p>
        <textarea name="word-list" id="word-list" cols={10} rows={8} />
      </div>
      <div className="subject">
        <h5>Tema</h5>
        <div className="options">
          <label htmlFor="animals">
            <input type="checkbox" name="custom-checkbox" id="animals" />
            <button type="button">Animais</button>
          </label>
          <label htmlFor="cars">
            <input type="checkbox" name="custom-checkbox" id="cars" />
            <button type="button">Carros</button>
          </label>
          <label htmlFor="sports">
            <input type="checkbox" name="custom-checkbox" id="sports" />
            <button type="button">Esportes</button>
          </label>
          <label htmlFor="names">
            <input type="checkbox" name="custom-checkbox" id="names" />
            <button type="button">Nomes</button>
          </label>
          <label htmlFor="bible">
            <input type="checkbox" name="custom-checkbox" id="bible" />
            <button type="button">Bíblicos</button>
          </label>
          <label htmlFor="fishes">
            <input type="checkbox" name="custom-checkbox" id="fishes" />
            <button type="button">Peixes</button>
          </label>
          <label htmlFor="companies">
            <input type="checkbox" name="custom-checkbox" id="companies" />
            <button type="button">Marcas</button>
          </label>
          <label htmlFor="birds">
            <input type="checkbox" name="custom-checkbox" id="birds" />
            <button type="button">Aves</button>
          </label>
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
