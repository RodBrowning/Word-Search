interface IConfig {
  boardSize?: {
    column: number;
    row: number;
  };
  numberOfWords?: number;
  words?: string[];
  customWords?: string[];
  useCustom?: boolean;
}

export default IConfig;
