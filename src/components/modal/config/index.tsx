import './style.scss';
import './style-mobile.scss';

import React, { useEffect, useRef, useState } from 'react';
import {
  clearMatchPoints,
  generateNewBoardData,
  resetGame,
  setCustomWords,
  setDifficulty as setDifficultyState,
  setLoadThemes as setLoadThemesState,
  setUseCustom as setUseCustomState,
} from '../../../features/game/gameSlice';
// eslint-disable-next-line import/order
import { useDispatch, useSelector } from 'react-redux';

import ConfirmationComponent from '../confirmation/confirmationComponent';
import ConfirmationModal from '../confirmation/confirmationModal';
import type { RootState } from '../../../app/store';

interface Props {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfigModal: React.FC<Props> = ({ setOpenModal }) => {
  const gameState = useSelector((state: RootState) => {
    return state.game;
  });
  const [openResetConfirmationModal, setOpenResetConfirmationModal] = useState(false);

  const [difficulty, setDifficulty] = useState(gameState.difficult.current);
  const difficultyRef = useRef(gameState.difficult.current);

  const [customWordList, setCustomWordList] = useState(gameState.customWords);
  const [customWordListDisplay, setCustomWordListDisplay] = useState(gameState.customWords.join(', '));
  const customWordListRef = useRef(gameState.customWords);

  const [useCustom, setUseCustom] = useState(gameState.useCustom);
  const useCustomRef = useRef(gameState.useCustom);

  const themes = Object.keys(gameState.themes);

  const [loadThemes, setLoadThemes] = useState(gameState.loadThemes);
  const loadThemesRef = useRef(gameState.loadThemes);

  const dispatch = useDispatch();

  const dispatchConfigChanges = () => {
    if (gameState.difficult.current !== difficultyRef.current) {
      dispatch(setDifficultyState(difficultyRef.current));
      dispatch(clearMatchPoints());
    }
    if (customWordListRef.current.length >= 10) {
      dispatch(setCustomWords(customWordListRef.current));
    }
    dispatch(setUseCustomState(useCustomRef.current));
    dispatch(setLoadThemesState(loadThemesRef.current));
    dispatch(generateNewBoardData());
  };

  const dispatchResetGame = () => {
    dispatch(resetGame());
    dispatch(generateNewBoardData());
  };

  const handleChangeDifficultyLevel = (value: 'easy' | 'normal' | 'hard') => {
    setDifficulty(value);
    difficultyRef.current = value;
  };

  const handleUseCustom = (isChecked: boolean) => {
    setUseCustom(isChecked);
    useCustomRef.current = isChecked;
  };

  const handleChangeCustomWords = (target: HTMLTextAreaElement) => {
    setCustomWordListDisplay(target.value);
    const words = target.value
      .split(',')
      .map((word) => {
        return word.trim();
      })
      .filter((word) => {
        return word !== '';
      })
      .filter((word) => {
        return /^[a-zA-Z]*$/.test(word);
      })
      .filter((word) => {
        return word.length > 2;
      });
    const uniqueWords = [...new Set(words)];
    setCustomWordList(uniqueWords);
    customWordListRef.current = uniqueWords;
  };

  const handleLoadThemes = (target: HTMLInputElement) => {
    let newLoadThemes = [];
    if (target.checked) {
      newLoadThemes = [...loadThemes, target.value];
    } else {
      newLoadThemes = loadThemes.filter((theme) => {
        return theme !== target.value;
      });
    }
    setLoadThemes(newLoadThemes);
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
            checked={difficulty === 'easy'}
            onChange={() => {
              handleChangeDifficultyLevel('easy');
            }}
          />
          <button type="button">Fácil</button>
        </label>
        <label htmlFor="normal">
          <input
            type="radio"
            name="difficulty-radio"
            id="normal"
            value="normal"
            checked={difficulty === 'normal'}
            onChange={() => {
              handleChangeDifficultyLevel('normal');
            }}
          />
          <button type="button">Médio</button>
        </label>
        <label htmlFor="hard">
          <input
            type="radio"
            name="difficulty-radio"
            id="hard"
            value="hard"
            checked={difficulty === 'hard'}
            onChange={() => {
              handleChangeDifficultyLevel('hard');
            }}
          />
          <button type="button">Difícil</button>
        </label>
      </div>
      <div className="word-list">
        <h5>Lista de palavras</h5>
        <label htmlFor="use-custom">
          <input
            type="checkbox"
            name="custom-checkbox"
            id="use-custom"
            checked={useCustom}
            disabled={customWordList.length < 10}
            onChange={(event) => {
              if (!event.target.checked && loadThemes.length < 1) return;
              handleUseCustom(event.target.checked);
            }}
          />
          <button type="button" className="toggle-button">
            Usar Custom
          </button>
        </label>
        <p>Separe por virgula. Mínimo 10 palavras.</p>
        <textarea
          name="word-list"
          id="word-list"
          cols={10}
          rows={8}
          value={customWordListDisplay}
          onChange={(event) => {
            handleChangeCustomWords(event.target);
          }}
        />
      </div>
      <div className="subject">
        <h5>Tema</h5>
        <div className="options">
          {themes.map((theme) => {
            return (
              <label htmlFor={theme} key={theme}>
                <input
                  type="checkbox"
                  name="custom-checkbox"
                  id={theme}
                  value={theme}
                  checked={loadThemes.includes(theme)}
                  onChange={(event) => {
                    if (!event.target.checked && loadThemes.length < 2 && !useCustom) return;
                    handleLoadThemes(event.target);
                  }}
                />
                <button type="button">{theme[0].toUpperCase() + theme.slice(1)}</button>
              </label>
            );
          })}
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
