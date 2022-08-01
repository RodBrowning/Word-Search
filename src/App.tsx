import './App.scss';

const App = () => {
  return (
    <div className="App">
      <header>
        <div className="inner-header">
          <div className="logo"></div>
          <nav></nav>
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
