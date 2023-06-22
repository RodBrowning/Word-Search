import './style.scss';
import './style-mobile.scss';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  generateNewBoardData,
  processWord,
  setAvailableSpace,
  setHiddenWords,
  setNextMatch,
} from '../../features/game/gameSlice';
// eslint-disable-next-line import/order
import { useDispatch, useSelector } from 'react-redux';

import Board from '../board';
import BoardSelector from '../boardSelector';
import ConfigModal from '../modal/config';
import IFeedback from '../../interfaces/feedback';
import InformationComponent from '../modal/info/informationComponent';
import InformationModal from '../modal/info/informationModal';
// eslint-disable-next-line import/order
import { Link } from 'react-router-dom';
import Modal from '../modal/modal';
import { RootState } from '../../app/store';
import WordList from '../feedbackWordList';
import useLocalStorage from '../../utils/customHooks/useLocalStorage';

const userLocale = navigator.language;

const Game: React.FC = () => {
  const [panelMinHeight, setPanelMinHeight] = useState(0);
  const availableSizeRef = useRef<HTMLElement>() as React.MutableRefObject<HTMLInputElement>;
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isFeedbacksHidden, setIsFeedbacksHidden] = useState(false);
  const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState<React.ReactNode>();
  const gameState = useSelector((state: RootState) => {
    return state.game;
  });
  const dispatch = useDispatch();

  const userContext = gameState.context.user;
  const gameContext = gameState.context.game;
  const [, setLocalStorageValue] = useLocalStorage('userContextState', userContext);

  const remainingWordsReducer = (total: number, feedback: IFeedback): number => {
    return feedback.found ? total - 1 : total;
  };

  const remainingWords = [...userContext.boardData.feedbacks].reduce<number>(
    remainingWordsReducer,
    userContext.boardData.feedbacks.length
  );

  useEffect(() => {
    const availableSpace = availableSizeRef.current?.getBoundingClientRect().width;
    dispatch(setAvailableSpace(availableSpace));
    if (userContext.boardData.board.length === 0) {
      dispatch(generateNewBoardData());
    }
  }, []);

  useLayoutEffect(() => {
    setIsFeedbacksHidden(userContext.hideFeedbacks);
  }, []);

  useEffect(() => {
    setLocalStorageValue(userContext);
    if (userContext.boardData.hasMatchEnded && !gameContext.hasEnded) {
      setInfoMessage(
        <>
          <h4>Parabéns!!!</h4>
          <br />
          <h5>Você completou o {userContext.matches + (userContext.round - 1) * gameContext.matchesLimit}º nivel</h5>
        </>
      );
      setIsInformationModalOpen(true);
    }
    if (gameContext.hasEnded) {
      setInfoMessage(
        <>
          <h4>Parabéns!!!</h4>
          <br />
          <h5>Você completou a {userContext.round - 1}ª rodada</h5>
          <h5>Iniciando {userContext.round}ª rodada</h5>
        </>
      );
      setIsInformationModalOpen(true);
    }
  }, [gameState]);

  function updateBoard() {
    const availableSpace = availableSizeRef.current?.getBoundingClientRect().width;
    dispatch(setAvailableSpace(availableSpace));
    dispatch(generateNewBoardData());
  }

  return (
    <div className="inner-panel inner-panel-game" style={{ minHeight: panelMinHeight + 'px' }}>
      <aside>
        <menu>
          <button
            className={`game-menu-action-button ${isConfigModalOpen ? 'active' : ''}`}
            title="Configurações"
            type="button"
            onClick={() => {
              setIsConfigModalOpen(true);
            }}
          >
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.5156 11.5238C18.5588 11.1877 18.5911 10.8465 18.5911 10.5C18.5911 10.1535 18.5588 9.81225 18.5156 9.47625L20.7981 7.7385C21.0031 7.581 21.0625 7.2975 20.9276 7.0665L18.7692 3.42825C18.6343 3.2025 18.3537 3.108 18.1109 3.2025L15.4238 4.25775C14.868 3.843 14.2582 3.49125 13.5999 3.2235L13.1952 0.441C13.1467 0.19425 12.9255 0 12.6557 0H8.33894C8.06915 0 7.84792 0.19425 7.80475 0.441L7.40006 3.2235C6.74176 3.49125 6.13202 3.83775 5.57625 4.25775L2.88909 3.2025C2.64628 3.11325 2.36569 3.2025 2.23079 3.42825L0.0724371 7.0665C-0.0624602 7.29225 -0.00310528 7.57575 0.201939 7.7385L2.47901 9.47625C2.43584 9.81225 2.40346 10.1535 2.40346 10.5C2.40346 10.8465 2.43584 11.1877 2.47901 11.5238L0.201939 13.2615C-0.00310528 13.419 -0.0624602 13.7025 0.0724371 13.9335L2.23079 17.5718C2.36569 17.7975 2.64628 17.892 2.88909 17.7975L5.57625 16.7422C6.13202 17.157 6.74176 17.5087 7.40006 17.7765L7.80475 20.559C7.84792 20.8057 8.06915 21 8.33894 21H12.6557C12.9255 21 13.1467 20.8057 13.1899 20.559L13.5945 17.7765C14.2528 17.5087 14.8626 17.1622 15.4184 16.7422L18.1055 17.7975C18.3483 17.8867 18.6289 17.7975 18.7638 17.5718L20.9222 13.9335C21.0571 13.7078 20.9977 13.4242 20.7927 13.2615L18.5156 11.5238ZM10.4973 14.175C8.40909 14.175 6.72018 12.5317 6.72018 10.5C6.72018 8.46825 8.40909 6.825 10.4973 6.825C12.5855 6.825 14.2744 8.46825 14.2744 10.5C14.2744 12.5317 12.5855 14.175 10.4973 14.175Z"
                fill="#0D0701"
              />
            </svg>
          </button>
          <Modal isOpen={isConfigModalOpen} setOpenModal={setIsConfigModalOpen}>
            <ConfigModal setOpenModal={setIsConfigModalOpen} setPanelHeight={setPanelMinHeight} />
          </Modal>
          <button
            className="game-menu-action-button refresh-btn"
            title="Atualizar quadro"
            type="button"
            onClick={updateBoard}
          >
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.4912 18.375C6.13011 18.375 2.60967 14.8575 2.60967 10.5C2.60967 6.1425 6.13011 2.625 10.4912 2.625C12.6631 2.625 14.6247 3.535 16.0434 4.9525L12.2427 8.75H21V0L17.9174 3.08C16.0083 1.19 13.3987 0 10.4912 0C4.69391 0 0 4.7075 0 10.5C0 16.2925 4.69391 21 10.4912 21C15.6931 21 20.0017 17.22 20.8249 12.25H18.1626C17.357 15.75 14.2394 18.375 10.4912 18.375Z"
                fill="#0D0701"
              />
            </svg>
          </button>
          <button
            className={`game-menu-action-button ${isFeedbacksHidden ? 'active' : ''}`}
            title={`Adicione mais complexidade ofuscando as palavras do gabarito e ganhe pontos extra. No modo Fácil ganhe ${Math.round(
              (gameContext.difficulty.parameters.easy.hiddenWordsExtraPoints - 1) * 100
            )}%, no Médio ${Math.round(
              (gameContext.difficulty.parameters.normal.hiddenWordsExtraPoints - 1) * 100
            )}% e no Difícil ${Math.round(
              (gameContext.difficulty.parameters.hard.hiddenWordsExtraPoints - 1) * 100
            )}% sobre o total de pontos ganhos em cada partida.`}
            type="button"
            onClick={() => {
              if (isFeedbacksHidden) {
                dispatch(setHiddenWords(false));
              } else {
                dispatch(generateNewBoardData());
                dispatch(setHiddenWords(true));
              }
              setIsFeedbacksHidden(!isFeedbacksHidden);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 20 20">
              <path
                fill="#000"
                d="m12.81 4.36l-1.77 1.78a4 4 0 0 0-4.9 4.9l-2.76 2.75C2.06 12.79.96 11.49.2 10a11 11 0 0 1 12.6-5.64zm3.8 1.85c1.33 1 2.43 2.3 3.2 3.79a11 11 0 0 1-12.62 5.64l1.77-1.78a4 4 0 0 0 4.9-4.9l2.76-2.75zm-.25-3.99l1.42 1.42L3.64 17.78l-1.42-1.42L16.36 2.22z"
              />
            </svg>
          </button>
          <Link to="imprimir">
            <button
              className="game-menu-action-button printer-btn"
              title="Crie caça-palavras customizados e divertidos. Com um painel intuitivo você poderá criar quadros com o formato que desejar em segundos. Uma opção muito conveniente para quem é professor de crianças e adolecentes e para reuniões em família e amigos."
              type="button"
            >
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.2 17.85H2.1C0.940202 17.85 0 16.9098 0 15.75V7.35C0 6.1902 0.940202 5.25 2.1 5.25H4.2V0H16.8V5.25H18.9C20.0598 5.25 21 6.1902 21 7.35V15.75C21 16.9098 20.0598 17.85 18.9 17.85H16.8V21H4.2V17.85ZM4.2 15.75V13.65H16.8V15.75H18.9V7.35H2.1V15.75H4.2ZM6.3 5.25H14.7V2.1H6.3V5.25ZM14.7 15.75H6.3V18.9H14.7V15.75ZM16.8 8.4C17.3799 8.4 17.85 8.8701 17.85 9.45C17.85 10.0299 17.3799 10.5 16.8 10.5C16.2201 10.5 15.75 10.0299 15.75 9.45C15.75 8.8701 16.2201 8.4 16.8 8.4Z"
                  fill="#0D0701"
                />
              </svg>
            </button>
          </Link>
        </menu>
        <div className="words">
          <h3>
            {remainingWords > 0 ? `${remainingWords} ${remainingWords > 1 ? 'Palavras' : 'Palavra'}` : 'Palavras'}
          </h3>
          <WordList feedbacks={userContext.boardData.feedbacks} blurFeedbaks={isFeedbacksHidden} />
        </div>
      </aside>
      <main ref={availableSizeRef}>
        <BoardSelector
          board={userContext.boardData.board}
          feedbacks={userContext.boardData.feedbacks}
          handleFoundWord={(word: string, color: string) => {
            dispatch(processWord({ word, color }));
          }}
        >
          <Board board={userContext.boardData.board} />
        </BoardSelector>
        <div className="score">
          <div className="points">
            <h4>
              <span>{(userContext.points + userContext.matchPoints).toLocaleString(userLocale)}</span>{' '}
              <span>Pontos</span>
            </h4>
          </div>
          <div className="level">
            <span>Nível</span>{' '}
            <span>
              {String(userContext.matches + (userContext.round - 1) * gameContext.matchesLimit).padStart(2, '0')}/
              {String(gameContext.matchesLimit * userContext.round)}
            </span>
          </div>
        </div>
        <InformationModal
          isOpen={isInformationModalOpen}
          setOpenModal={setIsInformationModalOpen}
          callbackAction={() => {
            dispatch(setNextMatch());
            dispatch(generateNewBoardData());
          }}
        >
          <InformationComponent
            setOpenModal={setIsInformationModalOpen}
            callbackAction={() => {
              dispatch(setNextMatch());
              dispatch(generateNewBoardData());
            }}
          >
            {infoMessage}
          </InformationComponent>
        </InformationModal>
      </main>
    </div>
  );
};

export default Game;
