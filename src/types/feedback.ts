export default interface IFeedback {
  word: string;
  direction: 'horizontal' | 'vertical' | 'diagonal';
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
