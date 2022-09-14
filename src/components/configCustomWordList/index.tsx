import './style.scss';
import './style-mobile.scss';

import React, { useState } from 'react';

interface Props {
  useCustom: boolean;
  handleUseCustomChanges: Function;
  customWordList: string[];
  handleCustomWordListChanges: Function;
  loadThemesLength: number;
}

const CustomWordListConfig: React.FC<Props> = ({
  useCustom,
  handleUseCustomChanges,
  customWordList,
  handleCustomWordListChanges,
  loadThemesLength,
}) => {
  const [customWordListDisplay, setCustomWordListDisplay] = useState(customWordList.join(', '));

  const handleChangeCustomWords = (target: HTMLTextAreaElement) => {
    setCustomWordListDisplay(target.value);
    const words = target.value
      .split(',')
      .map((word) => {
        return word.trim();
      })
      .filter((word) => {
        return word !== '';
      })
      .filter((word) => {
        return /^[a-zA-Z]*$/.test(word);
      })
      .filter((word) => {
        return word.length > 2;
      });
    const uniqueWords = [...new Set(words)];
    handleCustomWordListChanges(uniqueWords);
  };

  return (
    <div className="word-list-config">
      <h5>Lista de palavras</h5>
      <label htmlFor="use-custom">
        <input
          type="checkbox"
          name="custom-checkbox"
          id="use-custom"
          checked={useCustom}
          disabled={customWordList.length < 10}
          onChange={(event) => {
            if (!event.target.checked && loadThemesLength < 1) return;
            handleUseCustomChanges(event.target.checked);
          }}
        />
        <button type="button" className="toggle-button">
          Usar Custom
        </button>
      </label>
      <p>Separe por virgula. Mínimo 10 palavras.</p>
      <textarea
        name="word-list"
        id="word-list"
        cols={10}
        rows={8}
        value={customWordListDisplay}
        onChange={(event) => {
          handleChangeCustomWords(event.target);
        }}
      />
    </div>
  );
};

export default CustomWordListConfig;
