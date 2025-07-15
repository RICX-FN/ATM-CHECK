import React, { useEffect } from 'react';
import '../home/home.css';

function App() {
  useEffect(() => {
    document.title = "Home - login";
  }, []);

  return (
    <div className="App">

      <main>
        <div className="conteiner">
          <div className='titulo'>
            <h1>ATM Express</h1>
          </div>

          <div>
            <a className='btn-session-admin' href="#">Admin</a>
            <a className='btn-session-agent' href="#">Agent</a>
          </div>

          <p>Explore nossa Plataforma <strong>ATM Express</strong> e descubra os <strong>melhores pontos</strong> de Caixa Eletronico.</p>

        </div>
      </main>

    </div>
  );
}

export default App;
