import './style.scss';
import './style-mobile.scss';

import React from 'react';

const About: React.FC = () => {
  const table = (rows: number, columns: number) => {
    return Array(rows)
      .fill(0)
      .map(() => {
        return new Array(columns).fill('*');
      })
      .map((fArr) => {
        return fArr.map(() => {
          return String.fromCharCode(Math.floor(65 + Math.random() * (90 - 65 + 1)));
        });
      })
      .map((row, i) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <tr key={`row-${i}`}>
            {row.map((cell, j) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <td key={`row-${i}-cell-${j}`}>
                  <h6>{cell}</h6>
                </td>
              );
            })}
          </tr>
        );
      });
  };
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
        <div className="board">
          <table>
            <tbody>{table(10, 10)}</tbody>
            <tbody className="mobile">{table(8, 13)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default About;
