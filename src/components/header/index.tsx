import './style.scss';
import './style-mobile.scss';

import MobileNav from '../mobileNav/MobileNav';
import { NavLink } from 'react-router-dom';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header>
      <div className="inner-header">
        <div className="logo">
          <NavLink
            className={({ isActive }) => {
              return isActive ? 'active' : undefined;
            }}
            to="/"
          >
            <img src="/logo.svg" alt="" />
          </NavLink>
        </div>
        <nav>
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
        </nav>
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
