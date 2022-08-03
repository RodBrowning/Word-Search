import './App.scss';

const App = () => {
  return (
    <div className="App">
      <header>
        <div className="inner-header">
          <div className="logo">
            <img src="/logo.svg" alt="" />
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
        <div className="bg-decoration">
          <div className="inner-bg-decoration" />
        </div>
        <div className="inner-panel">
          <aside></aside>
          <main></main>
        </div>
      </div>
      <footer>
        <div className="copyright">
          <p>Copyright © 2022. Todos os direitos reservados. Desenvolvido por Rodrigo Moura.</p>
        </div>
        <div className="social-media">
          <div className="img">
            <img src="/assets/github.svg" alt="github" />
          </div>
          <div className="img">
            <img src="/assets/instagram.svg" alt="github" />
          </div>
          <div className="img">
            <img src="/assets/whatsapp.svg" alt="github" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
