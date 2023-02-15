import './style.scss';
import './style-mobile.scss';

import React, { useState } from 'react';

import Board from '../board';
import CustomWordListConfig from '../configCustomWordList';
import RangeInputComponent from '../rangeInputComponent';
import { RootState } from '../../app/store';
import SearchWordsGame from '../../utils/SearchWordGame';
import ThemesSelector from '../configThemesSelector';
import WordList from '../feedbackWordList';
import { useSelector } from 'react-redux';

const Printer: React.FC = () => {
  const gameState = useSelector((state: RootState) => {
    return state.game;
  });
  const themes = Object.keys(gameState.themes);

  const [useCustom, setUseCustom] = useState(false);
  const [themesToLoad, setThemesToLoad] = useState<string[]>([themes[0]]);
  const [customWords, setCustomWords] = useState<string[]>([]);

  const gameBoard = SearchWordsGame();
  const board = gameBoard.getBoard({
    boardSize: { columns: 30, rows: 15 },
    useCustom: true,
    customWords: ['caça-palavras', 'criança', 'aprender', 'memoria', 'futuro', 'sorte', 'santos'],
  });
  const feedbacks = gameBoard.getFeedbacks();

  const handleCustomWordListChanges = (wordsList: string[]) => {
    setCustomWords(wordsList);
    if (wordsList.length < 10) {
      setUseCustom(false);
      if (themesToLoad.length === 0) {
        setThemesToLoad([themes[0]]);
      }
    }
  };

  const handleLoadThemes = (target: HTMLInputElement) => {
    let newThemesToLoad = [];
    if (target.checked) {
      newThemesToLoad = [...themesToLoad, target.value];
    } else {
      newThemesToLoad = themesToLoad.filter((theme) => {
        return theme !== target.value;
      });
    }
    setThemesToLoad(newThemesToLoad);
  };

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
            useCustom={useCustom}
            handleUseCustomChanges={setUseCustom}
            customWordList={customWords}
            handleCustomWordListChanges={handleCustomWordListChanges}
            loadThemesLength={themesToLoad.length}
            cols={10}
            rows={4}
          />
        </div>
        <div className="themes-container">
          <ThemesSelector
            themes={themes}
            loadThemes={themesToLoad}
            useCustom={useCustom}
            handleLoadThemes={handleLoadThemes}
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
