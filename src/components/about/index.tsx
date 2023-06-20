import './style.scss';
import './style-mobile.scss';

import React, { useState } from 'react';

import Board from '../board';
import BoardSelector from '../boardSelector';
import SearchWordsGame from '../../utils/SearchWordGame';

const About: React.FC = () => {
  const deskGame = SearchWordsGame();
  const deskBoard = deskGame.getBoard({
    boardSize: { columns: 12, rows: 15 },
    words: [],
    useCustom: true,
    customWords: ['caça', 'palavras', 'criança', 'aprender', 'memoria', 'futuro', 'sorte', 'santos'],
  });
  const deskFeedbacks = deskGame.getFeedbacks();
  const [deskBoardState] = useState(deskBoard);
  const [deskFeedbacksState, setDeskFeedbacksState] = useState(deskFeedbacks);
  const deskHandleFoundWord = (word: string, color: string) => {
    const newFeedbacks = deskFeedbacksState.map((feedback) => {
      if (feedback.word === word) {
        return {
          ...feedback,
          found: true,
          color,
        };
      }
      return feedback;
    });
    setDeskFeedbacksState(newFeedbacks);
  };

  const mobileGame = SearchWordsGame();
  const mobileBoard = mobileGame.getBoard({
    boardSize: { columns: 8, rows: 8 },
    words: [],
    useCustom: true,
    customWords: ['caça', 'palavras', 'criança', 'aprender', 'memoria', 'futuro', 'sorte', 'santos'],
  });
  const mobileFeedbacks = mobileGame.getFeedbacks();
  const [mobileBoardState] = useState(mobileBoard);
  const [mobileFeedbacksState, setMobileFeedbacksState] = useState(mobileFeedbacks);
  const mobileHandleFoundWord = (word: string, color: string) => {
    const newFeedbacks = mobileFeedbacksState.map((feedback) => {
      if (feedback.word === word) {
        return {
          ...feedback,
          found: true,
          color,
        };
      }
      return feedback;
    });
    setMobileFeedbacksState(newFeedbacks);
  };

  return (
    <div className="inner-panel inner-panel-about">
      <div className="about-text">
        <span className="under-bar">
          <h1>Caça-palavras</h1>
        </span>
        <div className="about-sample">
          <div className="sample-board">
            <div className="desk">
              <BoardSelector
                board={deskBoardState}
                feedbacks={deskFeedbacksState}
                handleFoundWord={deskHandleFoundWord}
              >
                <Board board={deskBoardState} />
              </BoardSelector>
            </div>
            <div className="mobile">
              <BoardSelector
                board={mobileBoardState}
                feedbacks={mobileFeedbacksState}
                handleFoundWord={mobileHandleFoundWord}
              >
                <Board board={mobileBoardState} />
              </BoardSelector>
            </div>
          </div>
        </div>
        <p>
          Bem-vindo ao <strong>incrível</strong> mundo dos <strong>Caça-palavras!</strong> Este é o lugar perfeito para
          desafiar sua mente e se divertir ao mesmo tempo. Com uma variedade de opções <strong>personalizáveis</strong>,
          você pode criar e jogar Caça-palavras de acordo com suas preferências.
        </p>
        <p>
          Na <strong>página de jogo</strong>, você tem <strong>controle total</strong> sobre a experiência. É possível
          definir a <strong>dificuldade</strong> do jogo, ajustando o nível de desafio de acordo com suas habilidades.
          Se você está se sentindo <strong>corajoso</strong>, pode até mesmo optar por incluir palavras{' '}
          <strong>invertidas</strong>, que adicionam um toque extra de desafio ao jogo.
        </p>
        <p>
          Além disso, existe uma ampla seleção de <strong>temas</strong> para você escolher. Seja apaixonado por
          animais, história, esportes ou qualquer outro assunto, temos temas variados que se adaptam aos seus
          interesses. Dessa forma, você pode mergulhar em jogos temáticos empolgantes e descobrir palavras relacionadas
          ao seu <strong>tópico favorito</strong>.
        </p>
        <p>
          Para tornar a experiência ainda mais pessoal, é possível que você insira suas próprias{' '}
          <strong>palavras personalizadas</strong> nos jogos. Assim, você pode criar Caça-palavras com nomes de pessoas
          especiais, lugares significativos ou termos exclusivos que fazem parte da sua vida. Deixe sua{' '}
          <strong>imaginação</strong> correr solta e crie desafios únicos para si mesmo ou para compartilhar com amigos
          e familiares.
        </p>
        <p>
          Se você gosta de um pouco mais de <strong>mistério</strong>, também existe a opção de{' '}
          <strong>ocultar o gabarito</strong>. Dessa forma, você pode testar suas habilidades sem ter todas as respostas
          à vista. Desvendar cada palavra escondida se torna uma pequena vitória.
        </p>
        <p>
          Ao jogar, você encontrará um <strong>quadro de letras</strong> com palavras escondidas. Basta selecionar as
          palavras na tela arrastando o dedo ou mouse sobre as letras correspondentes. As palavras podem ser encontradas
          em diferentes <strong>direções: horizontal, vertical e diagonal</strong>, mantendo você atento e alerta
          durante o jogo.
        </p>
        <p>
          E não podemos esquecer da <strong>pontuação</strong>! A cada palavra encontrada, você acumula pontos. Quanto
          mais difícil a configuração do jogo, mais pontos serão adicionados à sua pontuação. Com essa{' '}
          <strong>mecânica</strong>, você pode desafiar a si mesmo para alcançar pontuações mais altas a cada jogo.
        </p>
        <p>
          O jogo é dividido em <strong>rounds de 100 fases</strong>. Esses rounds são <strong>infinitos</strong>, o que
          significa que você nunca atingirá um limite de pontuação. O desafio está sempre à sua espera, oferecendo uma
          experiência de jogo <strong>contínua</strong> e estimulante.
        </p>
        <p>
          Além disso, a plataforma ofereçe uma <strong>página exclusiva</strong> para{' '}
          <strong>impressão dos jogos</strong>. Nessa página, você encontrará um <strong>painel de configuração</strong>{' '}
          totalmente personalizável, permitindo que você ajuste todos os aspectos do jogo antes de imprimi-lo. Dessa
          forma, você pode levar o desafio com você para onde quer que vá e compartilhá-lo com outras pessoas.
        </p>
        <p>
          Estou <strong>empolgado</strong> em fazer parte da sua jornada nos <strong>Caça-palavras</strong>.{' '}
          <strong>Explore</strong> nossa plataforma, crie jogos desafiadores e mergulhe na <strong>diversão</strong> de
          descobrir palavras ocultas. <strong>Divirta-se</strong>, desafie sua mente e aproveite todas as{' '}
          <strong>possibilidades</strong>.
        </p>
      </div>
    </div>
  );
};

export default About;
