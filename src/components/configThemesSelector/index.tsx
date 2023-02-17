import './style.scss';
import './style-mobile.scss';

import React from 'react';

interface Props {
  themes: string[];
  loadThemes: string[];
  useCustom: boolean;
  handleLoadThemes: (target: HTMLInputElement) => void;
}

const ThemesSelector: React.FC<Props> = ({ themes, loadThemes, useCustom, handleLoadThemes }) => {
  return (
    <div className="subject">
      <h5>Temas</h5>
      <div className="options">
        {themes.map((theme) => {
          return (
            <label htmlFor={theme} key={theme}>
              <input
                type="checkbox"
                name="custom-checkbox"
                id={theme}
                value={theme}
                checked={loadThemes.includes(theme)}
                onChange={(event) => {
                  if (!event.target.checked && loadThemes.length < 2 && !useCustom) return;
                  handleLoadThemes(event.target);
                }}
              />
              <button type="button">{theme[0].toUpperCase() + theme.slice(1)}</button>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default ThemesSelector;
