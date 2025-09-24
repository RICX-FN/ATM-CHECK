// src/pages/dashboard/Dashboard.tsx
import { MdMenu } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { ReactElement } from "react";
import { useState, useEffect } from "react";
import Sideagent from "../../components/agente-sidebar/Sideagent";
import "../agent/agent.css";

function Agent() {
  const [showBtn, setShowBtn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userUsuario, setUserUsuario] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "agent" | "routes" | "notifications"
  >("agent");

  // Estados para os valores dos cards
  const [sistemaValue, setSistemaValue] = useState<number>(0);
  const [valoresValue, setValoresValue] = useState<number>(0);
  const [papelValue, setPapelValue] = useState<string>("Com papel");
  const [lscValue, setLscValue] = useState<string>("Sem Levantamento");

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const usuario = localStorage.getItem("userUsuario");
    setUserEmail(email);
    setUserUsuario(usuario);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleShowBtnEdit = () => {
    setShowBtn(!showBtn);
  };

  const handleAplicar = () => {
    setShowBtn(false);
    alert("Valores aplicados!");
  };

  return (
    <div className="Agent">
      <button className="menu-toggle" onClick={toggleSidebar}>
        {(MdMenu as any)({ size: 30 }) as ReactElement}
      </button>

      <Sideagent
        userEmail={userEmail}
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="container">
        {activeTab === "agent" && (
          <section className="session-agent">
            <div className="container-agent">
              <p className="user-agent">
                <strong>Bem-Vindo(a):</strong>{" "}
                {userUsuario ? userUsuario : "Não definido"}
              </p>
              <h3 className="uni-box">Unidades:</h3>

              {/* Cards */}
              <div className="box-card">
                <div className="card">
                  <h1 className="value-sistem">{sistemaValue}</h1>
                  <hr style={{ width: "auto", marginTop: "5px", marginBottom:"5px"}} />
                  <p className="description">Sistema</p>
                </div>

                <div className="card">
                  <h1 className="value-val">{valoresValue}</h1>
                  <hr style={{ width: "auto", marginTop: "5px", marginBottom:"5px"}} />
                  <p className="description">Valores</p>
                </div>

                <div className="card">
                  <h1 className="value-papel" style={{ fontSize: "14pt" }}>
                    {papelValue}
                  </h1>
                  <hr style={{ width: "auto", marginTop: "25px", marginBottom:"5px"}} />
                  <p className="description">Papel</p>
                </div>

                <div className="card">
                  <h1 className="value-lsc" style={{ fontSize: "14pt" }}>
                    {lscValue}
                  </h1>
                  <hr style={{ width: "auto", marginTop: "5px", marginBottom:"5px" }} />
                  <p className="description">LSC</p>
                </div>
              </div>

              {/* Botão Editar */}
              <div className="edit-icon">
                <button className="btn-edit-field" onClick={handleShowBtnEdit}>
                  {
                    (FiEdit as any)({
                      size: 24,
                      style: { cursor: "pointer", color: "white" },
                    }) as ReactElement
                  }
                </button>
              </div>

              {/* Formulário */}
              <div
                className="info-field"
                style={{ display: showBtn ? "flex" : "none" }}
              >
                <hr className="hr-info-field" />
                <p className="info-cards">Preencha o formulário</p>

                {/* Linha 1 - Sistema / Valores */}
                <div className="field-label-select">
                  <label htmlFor="sistema-id">Sistema</label>
                  <label htmlFor="valores-id">Valores</label>
                </div>
                <div className="field-select">
                  <select
                    className="field-numero"
                    id="sistema-id"
                    value={sistemaValue}
                    onChange={(e) => setSistemaValue(Number(e.target.value))}
                  >
                    {[0, 1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>

                  <select
                    className="field-numero"
                    id="valores-id"
                    value={valoresValue}
                    onChange={(e) => setValoresValue(Number(e.target.value))}
                  >
                    {[0, 1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Linha 2 - Papel / LSC */}
                <div className="field-label-select">
                  <label htmlFor="papel-id">Papel</label>
                  <label htmlFor="lsc-id">L. sem cartão</label>
                </div>
                <div className="field-select">
                  <select
                    className="field-papel"
                    id="papel-id"
                    value={papelValue}
                    onChange={(e) => setPapelValue(e.target.value)}
                  >
                    <option value="Com papel">Com papel</option>
                    <option value="Sem papel">Sem papel</option>
                  </select>

                  <select
                    className="field-lsc"
                    id="lsc-id"
                    value={lscValue}
                    onChange={(e) => setLscValue(e.target.value)}
                  >
                    <option value="Sem Levantamento">Sem Levantamento</option>
                    <option value="Com Levantamento">Com Levantamento</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field-btn">
              <button className="btn-aplicar" onClick={handleAplicar}>
                Aplicar
              </button>
            </div>
          </section>
        )}

        {activeTab === "routes" && (
          <section className="routes">
            <h3>chat</h3>
          </section>
        )}

        {activeTab === "notifications" && (
          <section className="notifications">
            <h3>Notificações</h3>
          </section>
        )}
      </div>
    </div>
  );
}

export default Agent;