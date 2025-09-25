// src/pages/dashboard/Dashboard.tsx
import React, { useState, useEffect, ReactElement } from 'react';
import { MdMenu } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import Sideagent from "../../components/agente-sidebar/Sideagent";
import "../agent/agent.css";

function Agent() {
  const [showBtn, setShowBtn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userUsuario, setUserUsuario] = useState<string | null>(null);
  const [atmId, setAtmId] = useState<string | null>(null);
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
    const storedAtmId = localStorage.getItem("atmId");
    setUserEmail(email);
    setUserUsuario(usuario);
    setAtmId(storedAtmId);

    // se houver atmId, buscar dados do ATM para popular a tela
    if (storedAtmId) {
      fetchAtm(storedAtmId);
    }
  }, []);

  // Busca dados do ATM e popula os estados da tela
  const fetchAtm = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://backend-atm-check.onrender.com/atms/${id}`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : undefined
      });
      if (!res.ok) {
        console.error('Erro ao buscar ATM:', res.statusText);
        return;
      }
      const data = await res.json().catch(() => null);
      if (!data) return;

      // mapear campos retornados para os estados locais (ajuste conforme a API)
      if (typeof data.sistema === 'number') setSistemaValue(data.sistema);
      if (typeof data.valores === 'number') setValoresValue(data.valores);
      if (typeof data.papel === 'string') setPapelValue(data.papel);
      if (typeof data.lsc === 'string') setLscValue(data.lsc);
    } catch (err) {
      console.error('Erro ao buscar ATM:', err);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleShowBtnEdit = () => {
    setShowBtn(!showBtn);
  };

  const handleAplicar = () => {
    setShowBtn(false);
    // se não houver atmId, apenas informar
    if (!atmId) {
      alert('ATM ID não definido. Alterações não foram enviadas.');
      return;
    }

    // envia os estados atuais para a API
    (async () => {
      try {
        const token = localStorage.getItem('token');
        const payload = {
          sistema: sistemaValue,
          valores: valoresValue,
          papel: papelValue,
          lsc: lscValue
        };

        const res = await fetch(`https://backend-atm-check.onrender.com/atms/${atmId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error('Erro ao atualizar ATM');
        alert('Valores aplicados!');
      } catch (err) {
        console.error('Erro ao aplicar valores:', err);
        alert('Erro ao aplicar valores');
      }
    })();
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
                  <hr style={{ width: "auto", marginTop: "5px", marginBottom: "5px" }} />
                  <p className="description">SISTEMA</p>
                </div>

                <div className="card">
                  <h1 className="value-val">{valoresValue}</h1>
                  <hr style={{ width: "auto", marginTop: "5px", marginBottom: "5px" }} />
                  <p className="description">VALORES</p>
                </div>

                <div className="card">
                  <h1 className="value-papel" style={{ fontSize: "14pt" }}>
                    {papelValue}
                  </h1>
                  <hr style={{ width: "auto", marginTop: "25px", marginBottom: "5px" }} />
                  <p className="description">PAPEL</p>
                </div>

                <div className="card">
                  <h1 className="value-lsc" style={{ fontSize: "14pt" }}>
                    {lscValue}
                  </h1>
                  <hr style={{ width: "auto", marginTop: "5px", marginBottom: "5px" }} />
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