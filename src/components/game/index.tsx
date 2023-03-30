import './style.scss';
import './style-mobile.scss';

import React, { useEffect, useRef, useState } from 'react';
import { generateNewBoardData, processWord, setAvailableSpace } from '../../features/game/gameSlice';
import { useDispatch, useSelector } from 'react-redux';

import Board from '../board';
import BoardSelector from '../BoardSelector';
import ConfigModal from '../modal/config';
import InformationComponent from '../modal/info/informationComponent';
import InformationModal from '../modal/info/informationModal';
import { Link } from 'react-router-dom';
import Modal from '../modal/modal';
import { RootState } from '../../app/store';
import WordList from '../feedbackWordList';

const Game: React.FC = () => {
  const availableSizeRef = useRef<HTMLElement>() as React.MutableRefObject<HTMLInputElement>;
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);
  const gameState = useSelector((state: RootState) => {
    return state.game;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const availableSpace = availableSizeRef.current?.clientWidth;
    dispatch(setAvailableSpace(availableSpace));
    if (gameState.boardData.board.length === 0) {
      dispatch(generateNewBoardData());
    }
  }, []);

  useEffect(() => {
    if (gameState.gameEnded) {
      alert('Ended');
    }
    if (gameState.boardData.matchEnded) {
      setIsInformationModalOpen(true);
    }
  }, [gameState]);

  function updateBoard() {
    const availableSpace = availableSizeRef.current?.clientWidth;
    dispatch(setAvailableSpace(availableSpace));
    dispatch(generateNewBoardData());
  }

  return (
    <div className="inner-panel inner-panel-game">
      <aside>
        <menu>
          <button
            className={`game-menu-action-button ${isConfigModalOpen && 'active'}`}
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
            <ConfigModal setOpenModal={setIsConfigModalOpen} />
          </Modal>
          <button className="game-menu-action-button" type="button" onClick={updateBoard}>
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.4912 18.375C6.13011 18.375 2.60967 14.8575 2.60967 10.5C2.60967 6.1425 6.13011 2.625 10.4912 2.625C12.6631 2.625 14.6247 3.535 16.0434 4.9525L12.2427 8.75H21V0L17.9174 3.08C16.0083 1.19 13.3987 0 10.4912 0C4.69391 0 0 4.7075 0 10.5C0 16.2925 4.69391 21 10.4912 21C15.6931 21 20.0017 17.22 20.8249 12.25H18.1626C17.357 15.75 14.2394 18.375 10.4912 18.375Z"
                fill="#0D0701"
              />
            </svg>
          </button>
          <Link to="imprimir">
            <button className="game-menu-action-button" type="button">
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
          <h3>Palavras</h3>
          <WordList feedbacks={gameState.boardData.feedbacks} />
        </div>
      </aside>
      <main ref={availableSizeRef}>
        <BoardSelector
          board={gameState.boardData.board}
          feedbacks={gameState.boardData.feedbacks}
          handleFoundWord={(word: string, color: string) => {
            dispatch(processWord({ word, color }));
          }}
        >
          <Board board={gameState.boardData.board} />
        </BoardSelector>
        <div className="placar">
          <div className="pontos">
            <h4>
              <span>{String(gameState.points + gameState.matchPoints).padStart(2, '0')}</span> <span>Pontos</span>
            </h4>
          </div>
          <div className="nivel">
            <span>Nível</span>{' '}
            <span>
              {String(gameState.matches).padStart(2, '0')}/{String(gameState.matchesLimit).padStart(2, '0')}
            </span>
          </div>
        </div>
        <InformationModal
          isOpen={isInformationModalOpen}
          setOpenModal={setIsInformationModalOpen}
          callbackAction={() => {
            dispatch(generateNewBoardData());
          }}
        >
          <InformationComponent
            setOpenModal={setIsInformationModalOpen}
            callbackAction={() => {
              dispatch(generateNewBoardData());
            }}
          >
            <h4>Parabéns!!!</h4>
            <br />
            <h5>Você completou o nivel {gameState.matches - 1}</h5>
          </InformationComponent>
        </InformationModal>
      </main>
    </div>
  );
};

export default Game;
