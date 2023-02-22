import './style.scss';
import './style-mobile.scss';

import React, { useEffect, useRef, useState } from 'react';

import Board from '../board';
import CustomWordListConfig from '../configCustomWordList';
import FeedbackBoard from '../feedbackBoard';
import IFeedback from '../../types/feedback';
import RangeInputComponent from '../rangeInputComponent';
import { RootState } from '../../app/store';
import SearchWordsGame from '../../utils/SearchWordGame';
import ThemesSelector from '../configThemesSelector';
import WordList from '../feedbackWordList';
import { useReactToPrint } from 'react-to-print';
import { useSelector } from 'react-redux';

const Printer: React.FC = () => {
  // Variables
  const gameBoard = SearchWordsGame();
  const gameState = useSelector((state: RootState) => state.game);
  const themes = gameState.themes;
  const themesTitles = Object.keys(themes);
  const minCustomWordsLength = 5;

  // States
  const [useCustom, setUseCustom] = useState(false);
  const [themesToLoad, setThemesToLoad] = useState<string[]>([themesTitles[0]]);
  const [customWords, setCustomWords] = useState<string[]>([]);
  const [columns, setColumns] = useState(15);
  const [rows, setRows] = useState(15);
  const [numberOfWords, setNumberOfWords] = useState(5);
  const [numberOfBoards, setNumberOfBoards] = useState(1);
  const [words, setWords] = useState<string[]>(themes[themesTitles[0]]);
  const [boardsToPrintArray, setBoardsToPrintArray] = useState<
    { board: string[][]; feedbacks: IFeedback[]; feedbackBoard: string[][] }[]
  >([]);
  const [showFeedbacks, setShowFeedbacks] = useState(false);

  // References
  const componentRef = useRef<HTMLDivElement>(null);

  // Functions
  const handleCustomWordListChanges = (wordsList: string[]) => {
    setCustomWords(wordsList);
    if (wordsList.length < minCustomWordsLength) {
      setUseCustom(false);
      if (themesToLoad.length === 0) {
        setThemesToLoad([themesTitles[0]]);
      }
    }
  };
  const handleThemesToLoad = (target: HTMLInputElement) => {
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
  const generateBoardsToPrint = () => {
    const boardsToPrint = [];
    for (let index = 0; index < numberOfBoards; index++) {
      const newBoard = gameBoard.getBoard({
        boardSize: { columns, rows },
        useCustom: useCustom,
        customWords,
        numberOfWords,
        words,
      });
      const newFeedbacks = gameBoard.getFeedbacks();
      const newFeedbackBoard = gameBoard.getFeedbackBoard();
      const newBoardToPrint: {
        board: string[][];
        feedbacks: IFeedback[];
        feedbackBoard: string[][];
      } = { board: newBoard, feedbacks: newFeedbacks, feedbackBoard: newFeedbackBoard };
      boardsToPrint.push(newBoardToPrint);
    }
    setBoardsToPrintArray(boardsToPrint);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Effects
  useEffect(() => {
    const newWords: string[] = [];
    themesToLoad.map((themeTitle) => newWords.push(...themes[themeTitle]));
    setWords(newWords);
  }, [themesToLoad]);

  useEffect(() => {
    generateBoardsToPrint();
  }, [words, columns, rows, numberOfWords, numberOfBoards]);

  useEffect(() => {
    if (useCustom && customWords.length >= minCustomWordsLength) {
      generateBoardsToPrint();
    }
  }, [customWords, useCustom]);

  return (
    <div className="printer-component" ref={componentRef}>
      <div className="printer-config-board">
        <div className="sizes-container">
          <RangeInputComponent
            name="numOfColumns"
            labelText="Numero de colunas"
            min={10}
            max={40}
            defaultValue={20}
            setInputValue={setColumns}
          />
          <RangeInputComponent
            name="numOfRows"
            labelText="Numero de linhas"
            min={10}
            max={35}
            defaultValue={20}
            setInputValue={setRows}
          />
        </div>
        <div className="amount-container">
          <RangeInputComponent
            name="numOfWords"
            labelText="Numero de palavras"
            min={1}
            max={70}
            defaultValue={numberOfWords}
            setInputValue={setNumberOfWords}
          />
          <RangeInputComponent
            name="numOfBoards"
            labelText="Numero de Quadros"
            min={1}
            max={20}
            defaultValue={numberOfBoards}
            setInputValue={setNumberOfBoards}
          />
        </div>
        <div className="custom-words-container">
          <CustomWordListConfig
            useCustom={useCustom}
            handleUseCustomChanges={setUseCustom}
            customWordList={customWords}
            handleCustomWordListChanges={handleCustomWordListChanges}
            loadThemesLength={themesToLoad.length}
            cols={10}
            rows={6}
            minWords={minCustomWordsLength}
          />
        </div>
        <div className="themes-container">
          <ThemesSelector
            themes={themesTitles}
            loadThemes={themesToLoad}
            useCustom={useCustom}
            handleLoadThemes={handleThemesToLoad}
          />
        </div>
        <div className="action-btns">
          <label htmlFor="answers-checkbox">
            <input
              type="checkbox"
              checked={showFeedbacks}
              onChange={() => setShowFeedbacks(!showFeedbacks)}
              name="withAnswers"
              id="answers-checkbox"
            />
            <button className="toggle-button">Incluir gabarito</button>
          </label>
          <button className="toggle-button" onClick={handlePrint}>
            Imprimir
          </button>
        </div>
      </div>
      <div className="boards-to-print">
        {boardsToPrintArray.map((newBoard, i) => {
          return (
            <>
              <div className="print-board no-split page-break" key={JSON.stringify(newBoard.feedbacks)}>
                <WordList feedbacks={newBoard.feedbacks} />
                <div className="board-container">
                  <Board board={newBoard.board} />
                </div>
              </div>
              {/* .feedback-board is generating unique key prop error */}
              <div
                className={`feedback-board page-break ${showFeedbacks ? 'include-feedback' : ''}`}
                key={'f' + i + JSON.stringify(newBoard.feedbacks)}
              >
                <FeedbackBoard board={newBoard.feedbackBoard} />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Printer;
