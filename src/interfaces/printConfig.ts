interface IPrintConfig {
  useCustom: boolean;
  useReverse: boolean;
  themesToLoad: string[];
  customWords: string[];
  columns: number;
  rows: number;
  numberOfWords: number;
  numberOfReverseWords: number;
  numberOfBoards: number;
  showFeedbacks: boolean;
}
export default IPrintConfig;
