import './style.scss';
import './style-mobile.scss';

import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        <div className={`background ${isMenuOpen ? 'show-bg' : ''}`} onClick={() => setIsMenuOpen(false)}></div>
        <nav className="mobile">
          <svg
            onClick={() => setIsMenuOpen(true)}
            width="30"
            height="25"
            viewBox="0 0 30 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.75"
              width="29"
              height="7"
              rx="3.5"
              transform="matrix(1 0 0.0777065 0.996976 0 0)"
              fill="#FFE8C6"
            />
            <rect opacity="0.75" y="8.97882" width="29" height="7" rx="3.5" fill="#FFE8C6" />
            <rect opacity="0.75" y="17.9788" width="29" height="7" rx="3.5" fill="#FFE8C6" />
          </svg>
          <menu className={isMenuOpen ? 'show-menu' : ''} onClick={() => setIsMenuOpen(false)}>
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
          </menu>
        </nav>
      </div>
    </header>
  );
};

export default Header;
