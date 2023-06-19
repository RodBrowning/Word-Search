import ITheme from './theme';

export default interface IGameContext {
  difficulty: {
    parameters: {
      [difficulty: string]: {
        gridShrinkFactor: number;
        wordsGrowthFactor: number;
        wordsLengthFactor: number;
        pointsByFoundWord: number;
        reverseWordsExtraPoints: number;
        hiddenWordsExtraPoints: number;
      };
    };
  };
  themes: ITheme;
  availableSpace: number;
  matchesLimit: number;
  hasEnded: boolean;
}
