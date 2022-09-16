import './style.scss';
import './style-mobile.scss';

import Board from '../board';
import CustomWordListConfig from '../configCustomWordList';
// eslint-disable-next-line import/order
import React from 'react';
import SearchWordsGame from '../../utils/SearchWordGame';
import ThemesSelector from '../configThemesSelector';
import WordList from '../feedbackWordList';

const Printer: React.FC = () => {
  const gameBoard = SearchWordsGame();
  const board = gameBoard.getBoard({
    boardSize: { columns: 30, rows: 15 },
    useCustom: true,
    customWords: ['caça-palavras', 'criança', 'aprender', 'memoria', 'futuro', 'sorte', 'santos'],
  });
  const feedbacks = gameBoard.getFeedbacks();
  return (
    <div className="printer-component">
      <div className="printer-config-board">
        <div className="sizes-container">
          <div className="label-container">
            <label htmlFor="numOfColumns">
              <h5>
                Numero de colunas<span style={{ float: 'right' }}>10</span>
              </h5>
              <div className="input-range">
                <input type="range" defaultValue={10} min={10} max={40} step={1} name="numOfColumns" />
              </div>
            </label>
          </div>
          <div className="label-container">
            <label htmlFor="numOfRows">
              <h5>
                Numero de linhas<span style={{ float: 'right' }}>10</span>
              </h5>
              <div className="input-range">
                <input type="range" defaultValue={10} min={10} max={40} step={1} name="numOfRows" />
              </div>
            </label>
          </div>
        </div>
        <div className="amount-container">
          <div className="label-container">
            <label htmlFor="numOfWords">
              <h5>
                Numero de palavras<span style={{ float: 'right' }}>10</span>
              </h5>
              <div className="input-range">
                <input type="range" defaultValue={10} min={10} max={30} step={1} name="numOfWords" />
              </div>
            </label>
          </div>
          <div className="label-container">
            <label htmlFor="numOfBoards">
              <h5>
                Numero de Quadros<span style={{ float: 'right' }}>10</span>
              </h5>
              <div className="input-range">
                <input type="range" defaultValue={1} min={1} max={20} step={1} name="numOfBoards" />
              </div>
            </label>
          </div>
        </div>
        <div className="custom-words-container">
          <CustomWordListConfig
            useCustom={false}
            handleUseCustomChanges={() => {}}
            customWordList={[]}
            handleCustomWordListChanges={() => {}}
            loadThemesLength={0}
            cols={10}
            rows={4}
          />
        </div>
        <div className="themes-container">
          <ThemesSelector
            themes={['criança', 'aprender', 'memoria']}
            loadThemes={['criança']}
            useCustom={false}
            handleLoadThemes={() => {}}
          />
        </div>
      </div>
      <div className="boards-to-print">
        <div className="print-board">
          <WordList feedbacks={feedbacks} />
          <div className="board-container">
            <Board board={board} />
          </div>
        </div>
        <div className="print-board">
          <WordList feedbacks={feedbacks} />
          <div className="board-container">
            <Board board={board} />
          </div>
        </div>
        <div className="print-board">
          <WordList feedbacks={feedbacks} />
          <div className="board-container">
            <Board board={board} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Printer;
