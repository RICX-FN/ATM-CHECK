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
            <h1>Faça login agora</h1>
            <p>ATM Express</p>
          </div>

          <div className="buttons">
            <a className='btn-session-admin' href="#">Admin</a>
            <a className='btn-session-agent' href="#">Agent</a>
          </div>
        </div>
      </main>

    </div>
  );
}

export default App;
