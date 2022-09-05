import './style.scss';
import './style-mobile.scss';

import React from 'react';

const ConfigModal: React.FC = () => {
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
        <button type="button" className="reset-game-button">
          Resetar Placar
        </button>
      </div>
    </div>
  );
};

export default ConfigModal;
