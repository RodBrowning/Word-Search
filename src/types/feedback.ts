export default interface IFeedback {
  word: string;
  found: boolean;
  position: {
    initial: {
      row: number;
      column: number;
    };
    final: {
      row: number;
      column: number;
    };
  };
}
