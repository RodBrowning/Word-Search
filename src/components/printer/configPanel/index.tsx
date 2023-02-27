import './style.scss';
import './style-mobile.scss';

import React, { useEffect, useLayoutEffect, useState } from 'react';

import CustomWordListConfig from '../../configCustomWordList';
import IFeedback from '../../../types/feedback';
import RangeInputComponent from '../../rangeInputComponent';
import { RootState } from '../../../app/store';
import SearchWordsGame from '../../../utils/SearchWordGame';
import ThemesSelector from '../../configThemesSelector';
import { useSelector } from 'react-redux';
import useSessionStorage from '../../../utils/customHooks/useSessionStorage';

interface Props {
  handlePrint: () => void;
  setBoardsToPrintArray: (
    boardsToPrint: {
      board: string[][];
      feedbacks: IFeedback[];
      feedbackBoard: string[][];
    }[]
  ) => void;
  setPrintFeedbacks: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAllBoards: React.Dispatch<React.SetStateAction<boolean>>;
}

const PrinterConfigPanel: React.FC<Props> = ({
  handlePrint,
  setBoardsToPrintArray,
  setPrintFeedbacks,
  setShowAllBoards,
}) => {
  // Variables
  const gameBoard = SearchWordsGame();
  const gameState = useSelector((state: RootState) => state.game);
  const themes = gameState.themes;
  const themesTitles = Object.keys(themes);
  const minCustomWordsLength = 5;

  // Session Storage
  const [printSession, setPrintSession] = useSessionStorage('printConfig', {
    useCustom: false,
    themesToLoad: [themesTitles[0]],
    customWords: [],
    columns: 15,
    rows: 15,
    numberOfWords: 20,
    numberOfBoards: 1,
    showFeedbacks: false,
  });

  // States
  const [useCustom, setUseCustom] = useState(printSession.useCustom);
  const [themesToLoad, setThemesToLoad] = useState<string[]>(printSession.themesToLoad);
  const [customWords, setCustomWords] = useState<string[]>(printSession.customWords);
  const [columns, setColumns] = useState(printSession.columns);
  const [rows, setRows] = useState(printSession.rows);
  const [numberOfWords, setNumberOfWords] = useState(printSession.numberOfWords);
  const [numberOfBoards, setNumberOfBoards] = useState(printSession.numberOfBoards);
  const [words, setWords] = useState<string[]>(themes[themesTitles[0]]);
  const [showFeedbacks, setShowFeedbacks] = useState(printSession.showFeedbacks);

  // Functions
  const handleCustomWordListChanges = (wordsList: string[]) => {
    setCustomWords(wordsList);
    printSession.customWords = wordsList;
    if (wordsList.length < minCustomWordsLength) {
      setUseCustom(false);
      printSession.useCustom = false;
      if (themesToLoad.length === 0) {
        setThemesToLoad([themesTitles[0]]);
        printSession.themesToLoad = [themesTitles[0]];
      }
    }
    setPrintSession(printSession);
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
    setPrintSession({ ...printSession, themesToLoad: newThemesToLoad });
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
    setShowAllBoards(false);
    setBoardsToPrintArray(boardsToPrint);
  };

  // Effects
  useLayoutEffect(() => {
    const newWords: string[] = [];
    themesToLoad.map((themeTitle) => newWords.push(...themes[themeTitle]));
    setWords(newWords);
  }, [themesToLoad]);

  useLayoutEffect(() => {
    generateBoardsToPrint();
  }, [words, columns, rows, numberOfWords, numberOfBoards]);

  useLayoutEffect(() => {
    if (useCustom && customWords.length >= minCustomWordsLength) {
      generateBoardsToPrint();
    }
  }, [customWords, useCustom]);

  useEffect(() => {
    setPrintFeedbacks(printSession.showFeedbacks);
  }, []);

  return (
    <div className="printer-config-board">
      <div className="sizes-container">
        <RangeInputComponent
          name="numOfColumns"
          labelText="Numero de colunas"
          min={10}
          max={40}
          defaultValue={printSession.columns}
          setInputValue={(columns: number) => {
            setColumns(columns);
            setPrintSession({ ...printSession, columns: columns });
          }}
        />
        <RangeInputComponent
          name="numOfRows"
          labelText="Numero de linhas"
          min={10}
          max={35}
          defaultValue={printSession.rows}
          setInputValue={(rows: number) => {
            setRows(rows);
            setPrintSession({ ...printSession, rows: rows });
          }}
        />
      </div>
      <div className="amount-container">
        <RangeInputComponent
          name="numOfWords"
          labelText="Numero de palavras"
          min={1}
          max={70}
          defaultValue={printSession.numberOfWords}
          setInputValue={(numOfwords: number) => {
            setNumberOfWords(numOfwords);
            setPrintSession({ ...printSession, numberOfWords: numOfwords });
          }}
        />
        <RangeInputComponent
          name="numOfBoards"
          labelText="Numero de Quadros"
          min={1}
          max={20}
          defaultValue={printSession.numberOfBoards}
          setInputValue={(numOfBoards: number) => {
            setNumberOfBoards(numOfBoards);
            setPrintSession({ ...printSession, numberOfBoards: numOfBoards });
          }}
        />
      </div>
      <div className="custom-words-container">
        <CustomWordListConfig
          useCustom={useCustom}
          handleUseCustomChanges={(checked) => {
            setUseCustom(checked);
            setPrintSession({ ...printSession, useCustom: checked });
          }}
          customWordList={printSession.customWords}
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
          loadThemes={printSession.themesToLoad}
          useCustom={printSession.useCustom}
          handleLoadThemes={handleThemesToLoad}
        />
      </div>
      <div className="action-btns">
        <label htmlFor="answers-checkbox">
          <input
            type="checkbox"
            checked={showFeedbacks}
            onChange={() => {
              setPrintFeedbacks(!showFeedbacks);
              setShowFeedbacks(!showFeedbacks);
              setPrintSession({ ...printSession, showFeedbacks: !showFeedbacks });
            }}
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
  );
};

export default PrinterConfigPanel;
