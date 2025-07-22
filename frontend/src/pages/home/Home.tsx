import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
            <h1 className='atmcheck'>ATM CHECK</h1>
          </div>

          <div className='btn-conteiner'>
            <Link to="/login-admin" className='btn-session-admin'>Admin</Link>

            <Link to="/login-agent" className='btn-session-agent'>Agente</Link>
          </div>

          <p className='p-explore'>Explore nossa Plataforma <strong>ATM CHECK</strong> e descubra os <strong>melhores </strong>pontos de Caixa Eletronico.</p>

          <div className="link-client">
            <a href="/destino">CHECAR AGORA</a>
          </div>

        </div>

      </main>

      <footer className='footer-home'>
        <p className='copyright'>&copy; 2025 Css no Backend. Todos direitos reservados.</p>
      </footer>

    </div>
  );
}

export default Home;
