import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../home/home.css';
import BtnLogout from '../../components/btn-logout/BtnLogout'

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
            <Link to="/login-admin" className='btn-session-admin'>Admin</Link>

            <Link to="/login-agent" className='btn-session-agent'>Agente</Link>
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
