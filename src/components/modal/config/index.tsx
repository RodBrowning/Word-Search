/* eslint-disable import/order */
import './style.scss';
import './style-mobile.scss';

import React, { useEffect, useRef, useState } from 'react';
import {
  clearMatchPoints as reduxClearMatchPoints,
  generateNewBoardData as reduxGenerateNewBoardData,
  resetGame as reduxResetGame,
  setCustomWords as reduxSetCustomWords,
  setDifficulty as reduxSetDifficulty,
  setLoadThemes as reduxSetLoadThemesState,
  setUseCustom as reduxSetUseCustomState,
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

  const [openResetConfirmationModal, setOpenResetConfirmationModal] = useState(false);
  const [configState, setConfigState] = useState({
    difficulty: gameState.difficult.current,
    customWordList: gameState.customWords,
    customWordListDisplay: gameState.customWords.join(', '),
    useCustom: gameState.useCustom,
    loadThemes: gameState.loadThemes,
  });

  const difficultyRef = useRef(gameState.difficult.current);
  const customWordListRef = useRef(gameState.customWords);
  const useCustomRef = useRef(gameState.useCustom);
  const themes = Object.keys(gameState.themes);
  const loadThemesRef = useRef(gameState.loadThemes);

  const dispatch = useDispatch();

  const dispatchConfigChanges = () => {
    if (gameState.difficult.current !== difficultyRef.current) {
      dispatch(reduxSetDifficulty(difficultyRef.current));
      dispatch(reduxClearMatchPoints());
    }
    dispatch(reduxSetCustomWords(customWordListRef.current));
    dispatch(reduxSetUseCustomState(useCustomRef.current));
    dispatch(reduxSetLoadThemesState(loadThemesRef.current));
    dispatch(reduxGenerateNewBoardData());
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

  const handleCustomWordListChanges = (words: string[]) => {
    setConfigState({ ...configState, customWordList: words });
    customWordListRef.current = words;
    if (words.length < 10) {
      setConfigState((oldConfigState) => {
        return { ...oldConfigState, useCustom: false };
      });
      useCustomRef.current = false;
      if (configState.loadThemes.length === 0) {
        setConfigState((oldConfigState) => {
          return { ...oldConfigState, loadThemes: [themes[0]] };
        });
      }
    }
  };

  const handleLoadThemes = (target: HTMLInputElement) => {
    let newLoadThemes = [];
    if (target.checked) {
      newLoadThemes = [...configState.loadThemes, target.value];
    } else {
      newLoadThemes = configState.loadThemes.filter((theme) => {
        return theme !== target.value;
      });
    }
    setConfigState({ ...configState, loadThemes: newLoadThemes });
    loadThemesRef.current = newLoadThemes;
  };

  const thereAreSomeChanges = () => {
    if (
      gameState.difficult.current === difficultyRef.current &&
      gameState.useCustom === useCustomRef.current &&
      gameState.customWords === customWordListRef.current &&
      gameState.loadThemes === loadThemesRef.current
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    return () => {
      if (thereAreSomeChanges()) {
        dispatchConfigChanges();
      }
    };
  }, []);

  return (
    <div className="config-panel show-config">
      <div className="difficulty">
        <h5>Dificuldade</h5>
        <label htmlFor="easy">
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
          <button type="button">F??cil</button>
        </label>
        <label htmlFor="normal">
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
          <button type="button">M??dio</button>
        </label>
        <label htmlFor="hard">
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
          <button type="button">Dif??cil</button>
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
      />
      <ThemesSelector
        themes={themes}
        loadThemes={configState.loadThemes}
        useCustom={configState.useCustom}
        handleLoadThemes={handleLoadThemes}
      />
      <div className="reset-game">
        <button
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
            dispatchAction={dispatchResetGame}
            setOpenModal={setOpenModal}
          >
            <h5>N??o ser?? poss??vel recuperar o progresso ap??s esta a????o.</h5>
            <h5>Deseja prosseguir?</h5>
          </ConfirmationComponent>
        </ConfirmationModal>
      </div>
    </div>
  );
};

export default ConfigModal;
