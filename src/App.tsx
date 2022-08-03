import './App.scss';

import logo from '../public/logo.svg';

const App = () => {
  return (
    <div className="App">
      <header>
        <div className="inner-header">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <nav>
            <a href="/" className="active">
              Inicio
            </a>
            <a href="#">Sobre</a>
            <a href="#">Contato</a>
          </nav>
        </div>
      </header>
      <div className="panel">
        <div className="inner-panel">
          <aside></aside>
          <main></main>
        </div>
      </div>
      <footer>
        <div className="copyright"></div>
        <div className="social-media"></div>
      </footer>
    </div>
  );
};

export default App;
