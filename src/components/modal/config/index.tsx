/* eslint-disable import/order */

import './style.scss';
import './style-mobile.scss';

import React, { useEffect, useRef, useState } from 'react';
import {
  generateNewBoardData as reduxGenerateNewBoardData,
  resetGame as reduxResetGame,
  setCustomWords as reduxSetCustomWords,
  setDifficulty as reduxSetDifficulty,
  setLoadThemes as reduxSetLoadThemesState,
  setUseCustom as reduxSetUseCustomState,
  setUseReverse as reduxSetUseReverseState,
} from '../../../features/game/gameSlice';
import { useDispatch, useSelector } from 'react-redux';

import ConfirmationComponent from '../confirmation/confirmationComponent';
import ConfirmationModal from '../confirmation/confirmationModal';
import CustomWordListConfig from '../../configCustomWordList';
import type { RootState } from '../../../app/store';
import ThemesSelector from '../../configThemesSelector';

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setPanelHeight: React.Dispatch<React.SetStateAction<number>>;
}

const ConfigModal: React.FC<Props> = ({ setOpenModal, setPanelHeight }) => {
  const gameState = useSelector((state: RootState) => {
    return state.game;
  });
  const gameContext = gameState.context.game;
  const userContext = gameState.context.user;
  const minCustomWordsLength = 10;

  const [openResetConfirmationModal, setOpenResetConfirmationModal] = useState(false);
  const [configState, setConfigState] = useState({
    difficulty: userContext.currentDifficulty,
    customWordList: userContext.customWords,
    customWordListDisplay: userContext.customWords.join(', '),
    useCustom: userContext.useCustom,
    useReverse: userContext.useReverse,
    loadThemes: userContext.loadThemes,
  });

  const difficultyRef = useRef(userContext.currentDifficulty);
  const customWordListRef = useRef(userContext.customWords);
  const useCustomRef = useRef(userContext.useCustom);
  const useReverseRef = useRef(userContext.useReverse);
  const themes = Object.keys(gameContext.themes);
  const loadThemesRef = useRef(userContext.loadThemes);
  const configPanelRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const dispatchConfigChanges = () => {
    if (userContext.currentDifficulty !== difficultyRef.current) {
      dispatch(reduxSetDifficulty(difficultyRef.current));
    }
    dispatch(reduxSetUseCustomState(useCustomRef.current));
    dispatch(reduxSetUseReverseState(useReverseRef.current));
    dispatch(reduxSetLoadThemesState(loadThemesRef.current));
    dispatch(reduxGenerateNewBoardData());
  };

  const dispatchCustomWordsChanges = () => {
    dispatch(reduxSetCustomWords(customWordListRef.current));
    if (useCustomRef.current) {
      dispatch(reduxGenerateNewBoardData());
    }
  };

  const dispatchResetGame = () => {
    dispatch(reduxResetGame());
    dispatch(reduxGenerateNewBoardData());
  };

  const handleChangeDifficultyLevel = (value: 'easy' | 'normal' | 'hard') => {
    setConfigState({ ...configState, difficulty: value });
    difficultyRef.current = value;
  };

  const handleUseCustomChanges = (isChecked: boolean) => {
    setConfigState({ ...configState, useCustom: isChecked });
    useCustomRef.current = isChecked;
  };

  const handleUseReverseChanges = (isReverse: boolean) => {
    setConfigState({ ...configState, useReverse: isReverse });
    useReverseRef.current = isReverse;
  };

  const handleCustomWordListChanges = (words: string[]) => {
    setConfigState({ ...configState, customWordList: words });
    customWordListRef.current = words;
    if (words.length < minCustomWordsLength) {
      setConfigState((oldConfigState) => {
        return { ...oldConfigState, useCustom: false };
      });
      useCustomRef.current = false;
      if (configState.loadThemes.length === 0) {
        setConfigState((oldConfigState) => {
          return { ...oldConfigState, loadThemes: [themes[0]] };
        });
        loadThemesRef.current = [themes[0]];
      }
    }
  };

  const handleLoadThemes = (target: HTMLInputElement) => {
    let newLoadThemes = [];
    if (target.checked) {
      newLoadThemes = [...configState.loadThemes, target.value].sort();
    } else {
      newLoadThemes = configState.loadThemes
        .filter((theme: string) => {
          return theme !== target.value;
        })
        .sort();
    }
    setConfigState({ ...configState, loadThemes: newLoadThemes });
    loadThemesRef.current = newLoadThemes;
  };

  const thereAreSomeChanges = () => {
    return (
      userContext.currentDifficulty !== difficultyRef.current ||
      userContext.useCustom !== useCustomRef.current ||
      userContext.useReverse !== useReverseRef.current ||
      JSON.stringify(userContext.loadThemes) !== JSON.stringify(loadThemesRef.current)
    );
  };
  const wasCustomWordsChanged = () => {
    return JSON.stringify(userContext.customWords) !== JSON.stringify(customWordListRef.current);
  };

  useEffect(() => {
    const configPanelHeight = configPanelRef.current?.offsetHeight;
    setPanelHeight(configPanelHeight as number);

    return () => {
      if (thereAreSomeChanges()) {
        dispatchConfigChanges();
      }
      if (wasCustomWordsChanged()) {
        dispatchCustomWordsChanges();
      }
      setPanelHeight(0);
    };
  }, []);

  return (
    <div className="config-panel show-config" ref={configPanelRef}>
      <div className="difficulty">
        <h5>Dificuldade</h5>
        <label
          htmlFor="easy"
          title={`Ganhe ${gameContext.difficulty.parameters.easy.pointsByFoundWord} ponto por palavra encontrata.`}
        >
          <input
            type="radio"
            name="difficulty-radio"
            id="easy"
            value="easy"
            checked={configState.difficulty === 'easy'}
            onChange={() => {
              handleChangeDifficultyLevel('easy');
            }}
          />
          <button type="button">Fácil</button>
        </label>
        <label
          htmlFor="normal"
          title={`Ganhe ${gameContext.difficulty.parameters.normal.pointsByFoundWord} ponto por palavra encontrata.`}
        >
          <input
            type="radio"
            name="difficulty-radio"
            id="normal"
            value="normal"
            checked={configState.difficulty === 'normal'}
            onChange={() => {
              handleChangeDifficultyLevel('normal');
            }}
          />
          <button type="button">Médio</button>
        </label>
        <label
          htmlFor="hard"
          title={`Ganhe ${gameContext.difficulty.parameters.hard.pointsByFoundWord} ponto por palavra encontrata.`}
        >
          <input
            type="radio"
            name="difficulty-radio"
            id="hard"
            value="hard"
            checked={configState.difficulty === 'hard'}
            onChange={() => {
              handleChangeDifficultyLevel('hard');
            }}
          />
          <button type="button">Difícil</button>
        </label>
      </div>
      <div className="reverse">
        <h5>Palavras ao contrário</h5>
        <label
          htmlFor="use-reverse"
          title={`Adicione mais complexidade com palavras invertidas e ganhe pontos extra. No o modo Fácil ganhe ${Math.round(
            (gameContext.difficulty.parameters.easy.reverseWordsExtraPoints - 1) * 100
          )}%, no Médio ${Math.round(
            (gameContext.difficulty.parameters.normal.reverseWordsExtraPoints - 1) * 100
          )}% e no Difícil ${Math.round(
            (gameContext.difficulty.parameters.hard.reverseWordsExtraPoints - 1) * 100
          )}% sobre o total de pontos ganhos em cada partida. A quantidade aumenta com o decorrer do jogo.`}
        >
          <input
            type="checkbox"
            name="reverse-checkbox"
            id="use-reverse"
            checked={configState.useReverse}
            onChange={(event) => {
              handleUseReverseChanges(event.target.checked);
            }}
          />
          <button type="button" className="toggle-button">
            Incluir
          </button>
        </label>
      </div>

      <CustomWordListConfig
        useCustom={configState.useCustom}
        handleUseCustomChanges={handleUseCustomChanges}
        customWordList={configState.customWordList}
        handleCustomWordListChanges={handleCustomWordListChanges}
        loadThemesLength={configState.loadThemes.length}
        cols={10}
        rows={8}
        minWords={minCustomWordsLength}
      />
      <ThemesSelector
        themes={themes}
        loadThemes={configState.loadThemes}
        useCustom={configState.useCustom}
        handleLoadThemes={handleLoadThemes}
      />
      <div className="reset-game">
        <button
          title="Zera todo o placar do jogo."
          type="button"
          className="reset-game-button full-size"
          onClick={() => {
            setOpenResetConfirmationModal(true);
          }}
        >
          Reiniciar Placar
        </button>
        <ConfirmationModal isOpen={openResetConfirmationModal} setOpenModal={setOpenResetConfirmationModal}>
          <ConfirmationComponent
            setOpenConfirmationModal={setOpenResetConfirmationModal}
            callbackAction={dispatchResetGame}
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
