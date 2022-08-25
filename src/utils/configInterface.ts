interface IConfig {
  boardSize?: {
    columns: number;
    rows: number;
  };
  numberOfWords?: number;
  words?: string[];
  customWords?: string[];
  useCustom?: boolean;
}

export default IConfig;
