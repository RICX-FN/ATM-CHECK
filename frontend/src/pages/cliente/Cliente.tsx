import "../cliente/cliente.css";

function Cliente() {
  return (
    <div className="screen-cliente">
      {/*
        1. header {barra de pesquisa, botão de pesquisa, filtro, }
        2. cards com os status dos ATMs
        */}
      <div className="container-cliente">
        <h1 className="head-text-cliente">Explore</h1>
        <header className="header-cliente">
            <input className="search-bar-cliente" type="search" placeholder="Buscar por cidades"/>
        </header>

        <section className="session-cards-cliente">
            <div className="card-cliente">
                <p className="cidade-cliente">Cidade: {}</p>
                <hr className="linha-card-cliente"/>
                <p className="status-atm-cliente">Status ATM</p>
                <p className="unidades-atm-cliente">ATM: {}</p>
                <p className="papel-cliente">Papel: {}</p>
                <p className="valores-cliente">Valores: {}</p>
                <p className="sistema-cliente">Sistema: {}</p>
                <p className="LSC-cliente">Levantamento sem cartão: {}</p>
            </div>
        </section>
      </div>
    </div>
  );
}

export default Cliente;
