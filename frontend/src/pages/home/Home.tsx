import React, { useEffect } from 'react';
import '../home/home.css';

function Home() {
  useEffect(() => {
    document.title = "ATM CHECK";
  }, []);

  return (
    <div className="Home">

      <main>
        
        <div className="conteiner">
          <div className='titulo'>
            <h1>ATM CHECK</h1>
          </div>

          <div className='btn-conteiner'>
            <a className='btn-session-admin' href="#">Admin</a>
            <a className='btn-session-agent' href="#">Agent</a>
          </div>

          <p>Explore nossa Plataforma <strong>ATM CHECK</strong> e descubra os <strong>melhores </strong>pontos de Caixa Eletronico.</p>

          <div className="link-client">
            <a href="#">Check ATM</a>
          </div>

        </div>

      </main>

      <footer>
        <p>&copy; 2025 Todos direitos reservados.</p>
      </footer>

    </div>
  );
}

export default Home;
