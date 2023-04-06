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
}

const ConfigModal: React.FC<Props> = ({ setOpenModal }) => {
  const gameState = useSelector((state: RootState) => {
    return state.game;
  });
  const minCustomWordsLength = 10;

  const [openResetConfirmationModal, setOpenResetConfirmationModal] = useState(false);
  const [configState, setConfigState] = useState({
    difficulty: gameState.difficult.current,
    customWordList: gameState.customWords,
    customWordListDisplay: gameState.customWords.join(', '),
    useCustom: gameState.useCustom,
    useReverse: gameState.useReverse,
    loadThemes: gameState.loadThemes,
  });

  const difficultyRef = useRef(gameState.difficult.current);
  const customWordListRef = useRef(gameState.customWords);
  const useCustomRef = useRef(gameState.useCustom);
  const useReverseRef = useRef(gameState.useReverse);
  const themes = Object.keys(gameState.themes);
  const loadThemesRef = useRef(gameState.loadThemes);

  const dispatch = useDispatch();

  const dispatchConfigChanges = () => {
    if (gameState.difficult.current !== difficultyRef.current) {
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
      gameState.difficult.current !== difficultyRef.current ||
      gameState.useCustom !== useCustomRef.current ||
      gameState.useReverse !== useReverseRef.current ||
      JSON.stringify(gameState.loadThemes) !== JSON.stringify(loadThemesRef.current)
    );
  };
  const wasCustomWordsChanged = () => {
    return JSON.stringify(gameState.customWords) !== JSON.stringify(customWordListRef.current);
  };

  useEffect(() => {
    return () => {
      if (thereAreSomeChanges()) {
        dispatchConfigChanges();
      }
      if (wasCustomWordsChanged()) {
        dispatchCustomWordsChanges();
      }
    };
  }, []);

  return (
    <div className="config-panel show-config">
      <div className="difficulty">
        <h5>Dificuldade</h5>
        <label
          htmlFor="easy"
          title={`Ganhe ${gameState.difficult.parameters.easy.pointsByFoundWord} ponto por palavra encontrata.`}
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
          title={`Ganhe ${gameState.difficult.parameters.normal.pointsByFoundWord} ponto por palavra encontrata.`}
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
          title={`Ganhe ${gameState.difficult.parameters.hard.pointsByFoundWord} ponto por palavra encontrata.`}
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
            (gameState.difficult.parameters.easy.reverseWordsExtraPoints - 1) * 100
          )}%, no Médio ${Math.round(
            (gameState.difficult.parameters.normal.reverseWordsExtraPoints - 1) * 100
          )}% e no Difícil ${Math.round(
            (gameState.difficult.parameters.hard.reverseWordsExtraPoints - 1) * 100
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
