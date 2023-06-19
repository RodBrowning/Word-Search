import IGameState from '../../interfaces/state';
import ITheme from '../../interfaces/theme';
import IUserContext from '../../interfaces/userContext';

export const getInitialGameState = (initialGameState: IGameState) => {
  const storedUserContext = window.localStorage.getItem('userContextState');
  let userContext = storedUserContext ? JSON.parse(storedUserContext) : initialGameState.context.user;
  const gameThemes = initialGameState.context.game.themes;

  userContext = ensureItHasSomeThemeToLoad(userContext, gameThemes);
  initialGameState.context.user = userContext;

  return initialGameState;
};

const ensureItHasSomeThemeToLoad = (userContext: IUserContext, gameThemes: ITheme) => {
  const notHaveRequiredThemesToLoad = !userContext.loadThemes.some((themeToLoad: string) => {
    return gameThemes.hasOwnProperty(themeToLoad);
  });

  if (notHaveRequiredThemesToLoad) {
    userContext.loadThemes.push(Object.keys(gameThemes)[0]);
  }

  return userContext;
};
