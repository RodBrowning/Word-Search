interface IConfig {
  boardSize?: {
    columns: number;
    rows: number;
  };
  numberOfWords?: number;
  numberOfReverseWords?: number;
  words?: string[];
  customWords?: string[];
  useCustom?: boolean;
  useReverse?: boolean;
}

export default IConfig;
