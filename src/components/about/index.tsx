import './style.scss';
import './style-mobile.scss';

import Board from '../board';
// eslint-disable-next-line import/order
import React from 'react';
import SearchWordsGame from '../../utils/SearchWordGame';

const About: React.FC = () => {
  return (
    <div className="inner-panel inner-panel-about">
      <div className="about-text">
        <span className="under-bar">
          <h1>Caça-palavras</h1>
        </span>
        <p>
          O jogo de caça-palavras, ou sopa de letras, é um passatempo que consiste de letras arranjadas aparentemente
          aleatórias em uma grade quadrada ou retangular.
        </p>
        <p>
          O objetivo do jogo é encontrar e circundar as palavras escondidas na grade tão rapidamente quanto possível.
        </p>
        <p>
          As palavras são arranjadas normalmente de modo que possam ser lidas da esquerda para a direita, de cima para
          baixo e na diagonal, sendo que em passatempos de maior dificuldade também pode ocorrer o oposto.
        </p>
        <p>
          Algumas vezes uma lista de palavras escondidas é fornecida, mas os passatempos mais desafiadores podem fazer
          com que o jogador descubra-as.
        </p>
        <p>
          A maioria dos passatempos de caça-palavras tem também um tema comum a qual todas as palavras escondidas estão
          relacionadas.
        </p>
      </div>
      <div className="about-sample">
        <span className="under-bar">
          <h1>Caça-palavras</h1>
        </span>
        <div className="sample-board">
          <div className="desk">
            <Board
              board={SearchWordsGame().getBoard({
                boardSize: { columns: 10, rows: 15 },
                useCustom: true,
                customWords: ['caça', 'palavras', 'criança', 'aprender', 'memoria', 'futuro', 'sorte', 'santos'],
              })}
            />
          </div>
          <div className="mobile">
            <Board
              board={SearchWordsGame().getBoard({
                boardSize: { columns: 8, rows: 8 },
                useCustom: true,
                customWords: ['caça', 'palavras', 'criança', 'aprender', 'memoria', 'futuro', 'sorte', 'santos'],
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
