import IGameState from '../../types/state';
import ITheme from '../../types/theme';

export const getInitialGameState = (defaultInitialGameState: IGameState) => {
  const localState = window.localStorage.getItem('gameState');
  let currentGameState = localState ? JSON.parse(localState) : defaultInitialGameState;

  currentGameState = ensureItHasSomeThemeToLoad(currentGameState, defaultInitialGameState.themes);

  return { ...currentGameState, themes: defaultInitialGameState.themes };
};

const ensureItHasSomeThemeToLoad = (gameState: IGameState, currentGameThemes: ITheme) => {
  const notHaveRequiredThemesToLoad = !gameState.loadThemes.some((themeToLoad: string) => {
    return currentGameThemes.hasOwnProperty(themeToLoad);
  });

  if (notHaveRequiredThemesToLoad) {
    gameState.loadThemes.push(Object.keys(currentGameThemes)[0]);
  }

  return gameState;
};
