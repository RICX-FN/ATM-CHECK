import "../cliente/cliente.css";

function Cliente() {
  return (
    <div className="screen-cliente">
      {/*
        1. header {barra de pesquisa, botão de pesquisa, filtro, }
        2. cards com os status dos ATMs
        */}
      <div className="container-cliente">
        <header className="header-cliente">
          <h1 className="head-text-cliente">Explore</h1>
          <input className="search-bar-cliente" type="search" placeholder="Buscar por cidades" />
        </header>

        <section className="session-cards-cliente">
          <div className="card-cliente">
            <div className="text-content-card-client">
              <h3 className="cidade-cliente">Cidade {}</h3>
              <p className="unidades-atm-cliente">0 {}unidades</p>
            </div>

            <div className="group-card-cliente">
              <div className="retangulo-card-clinte">
                <div className="icon-card-cliente">
                  📄
                </div>
                <div className="values-card-cliente">
                  <p>0</p>
                </div>
              </div>

              <div className="retangulo-card-clinte">
                <div className="icon-card-cliente">
                  💰
                </div>
                <div className="values-card-cliente">
                  <p>0</p>
                </div>
              </div>

              <div className="retangulo-card-clinte">
                <div className="icon-card-cliente">
                  ⚙️
                </div>
                <div className="values-card-cliente">
                  <p>0</p>
                </div>
              </div>

              <div className="retangulo-card-clinte">
                <div className="icon-card-cliente">
                  💳
                </div>
                <div className="values-card-cliente">
                  <p>0</p>
                </div>
              </div>
            </div>
            
            <p className="clickbtn-card-cliente">↓ COPIE E USE NO GPS</p>

            <button className="btn-card-cliente">Copiar localização</button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Cliente;
