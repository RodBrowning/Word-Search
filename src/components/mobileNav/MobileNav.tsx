import './style.scss';
import './style-mobile.scss';

import { NavLink } from 'react-router-dom';
import React from 'react';

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNav: React.FC<Props> = ({ setIsOpen }) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      closeModal();
    }
  };

  return (
    <div id="mobile-nav">
      <nav>
        <div onClick={closeModal} onKeyDown={handleKeyDown} role="button" tabIndex={0}>
          <NavLink
            className={({ isActive }) => {
              return isActive ? 'active' : undefined;
            }}
            to="/"
          >
            Inicio
          </NavLink>
          <NavLink
            className={({ isActive }) => {
              return isActive ? 'active' : undefined;
            }}
            to="/imprimir"
          >
            Impressão
          </NavLink>
          <NavLink
            className={({ isActive }) => {
              return isActive ? 'active' : undefined;
            }}
            to="/sobre"
          >
            Sobre
          </NavLink>
          <NavLink
            className={({ isActive }) => {
              return isActive ? 'active' : undefined;
            }}
            to="/contato"
          >
            Contato
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;
