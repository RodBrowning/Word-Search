import './style.scss';
import './style-mobile.scss';

import Board from '../board';
import CustomWordListConfig from '../configCustomWordList';
// eslint-disable-next-line import/order
import React from 'react';
import SearchWordsGame from '../../utils/SearchWordGame';
import ThemesSelector from '../configThemesSelector';
import WordList from '../feedbackWordList';
// eslint-disable-next-line sort-imports
import RangeInputComponent from '../rangeInputComponent';

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
          <RangeInputComponent name="numOfColumns" labelText="Numero de colunas" min={10} max={30} defaultValue={20} />
          <RangeInputComponent name="numOfRows" labelText="Numero de linhas" min={10} max={30} defaultValue={20} />
        </div>
        <div className="amount-container">
          <RangeInputComponent name="numOfWords" labelText="Numero de palavras" min={10} max={30} defaultValue={20} />
          <RangeInputComponent name="numOfBoards" labelText="Numero de Quadros" min={1} max={20} defaultValue={10} />
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
