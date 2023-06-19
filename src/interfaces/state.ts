import IGameContext from './gameContext';
import IUserContext from './userContext';

export default interface IGameState {
  context: {
    game: IGameContext;
    user: IUserContext;
  };
}
