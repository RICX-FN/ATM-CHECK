// src/pages/dashboard/Dashboard.tsx
import React, { useState, useEffect, ReactElement } from 'react';
import { MdMenu } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import Sideagent from "../../components/agente-sidebar/Sideagent";
import "../agent/agent.css";

// Import do react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Agent() {
  const [showBtn, setShowBtn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userUsuario, setUserUsuario] = useState<string | null>(null);
  const [atmId, setAtmId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "agent" | "routes" | "notifications"
  >("agent");

  // Estados para os valores dos cards (todos numéricos)
  const [sistemaValue, setSistemaValue] = useState<number>(0);
  const [valoresValue, setValoresValue] = useState<number>(0);
  const [papelValue, setPapelValue] = useState<number>(0);
  const [lscValue, setLscValue] = useState<number>(0);

  // estados para contagem de ATMs do agente logado
  const [atmCount, setAtmCount] = useState<number | null>(null);
  const [atmCountLoading, setAtmCountLoading] = useState<boolean>(false);
  const [atmCountError, setAtmCountError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Current token:', token);
    if (!token) {
      console.warn('No token found in localStorage — continuing without auth header');
    }

    const email = localStorage.getItem("userEmail");
    const usuario = localStorage.getItem("userUsuario");

    const storedAtmId = findAtmIdFromStorage();
    console.log('Initial atmId:', storedAtmId);

    setUserEmail(email);
    setUserUsuario(usuario);
    if (storedAtmId) {
      setAtmId(storedAtmId);
      console.log('Set atmId state to:', storedAtmId);
      localStorage.setItem('atmId', storedAtmId);
      sessionStorage.setItem('atmId', storedAtmId);
    } else {
      console.warn('No atmId available in storage; user must select or be assigned an ATM before applying changes.');
    }

    const storedAgentId =
      localStorage.getItem("userId") ||
      localStorage.getItem("agentId") ||
      localStorage.getItem("id") ||
      null;

    if (storedAgentId) {
      fetchAgentAtmCount(storedAgentId);
    }

    if (storedAtmId) {
      fetchAtm(storedAtmId);
    }
  }, []);

  const findAtmIdFromStorage = (): string | null => {
    const keys = ['atmId', 'atmID', 'idAtm', 'id_atm', 'atmid', 'atm_id', 'id', 'ATM_ID'];

    for (const k of keys) {
      const v = localStorage.getItem(k);
      if (v) return v;
    }
    for (const k of keys) {
      const v = sessionStorage.getItem(k);
      if (v) return v;
    }
    return null;
  };

  const fetchAtm = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://backend-atm-check.onrender.com/atms/${id}`, {
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) return;

      const data = await res.json().catch(() => null);
      if (!data) return;

      if (typeof data.sistema === 'number') setSistemaValue(data.sistema);
      if (typeof data.valores === 'number') setValoresValue(data.valores);
      if (typeof data.papel === 'number') setPapelValue(data.papel);
      if (typeof data.lsc === 'number') setLscValue(data.lsc);
    } catch (err) {
      console.error('Erro ao buscar ATM:', err);
    }
  };

  const fetchAgentAtmCount = async (id: string): Promise<number | null> => {
    setAtmCountLoading(true);
    setAtmCountError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://backend-atm-check.onrender.com/agentes/${id}/atm-count`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : undefined
      });
      if (!res.ok) throw new Error('Erro HTTP');
      const data = await res.json().catch(() => null);
      let count: number | null = null;
      if (typeof data === 'number') count = data;
      else if (typeof data.count === 'number') count = data.count;
      else if (typeof data.numeroDeAtms === 'number') count = data.numeroDeAtms;
      else if (typeof data.atmCount === 'number') count = data.atmCount;
      setAtmCount(count ?? 0);
      return count;
    } catch (err: any) {
      setAtmCountError(err.message || 'Erro');
      return null;
    } finally {
      setAtmCountLoading(false);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleShowBtnEdit = () => setShowBtn(!showBtn);

  const handleAplicar = () => {
    setShowBtn(false);
    const currentAtmId = atmId || findAtmIdFromStorage();
    if (!currentAtmId) {
      console.warn('ID do ATM não definido.');
      return;
    }
    localStorage.setItem('atmId', currentAtmId);
    sessionStorage.setItem('atmId', currentAtmId);
    setAtmId(currentAtmId);

    (async () => {
      try {
        const token = localStorage.getItem('token');
        let countToSend: number | null = atmCount;
        if (countToSend == null) {
          const storedAgentId = localStorage.getItem("userId") || localStorage.getItem("agentId") || localStorage.getItem("id") || null;
          if (storedAgentId) countToSend = await fetchAgentAtmCount(storedAgentId);
        }

        const minimalPayload: any = {
          sistema: sistemaValue,
          valores: valoresValue,
          papel: papelValue,
          lsc: lscValue,
          numeroDeAtms: countToSend ?? 0
        };

        const headers: any = { 'Content-Type': 'application/json' };
        if (token) headers.Authorization = `Bearer ${token}`;

        console.log('Attempting PATCH with payload:', minimalPayload);
        const patchRes = await fetch(`https://backend-atm-check.onrender.com/atms/${currentAtmId}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify(minimalPayload)
        });

        if (patchRes.ok) {
          toast.success('✅ Valores aplicados com sucesso!', {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        } else {
          console.warn('PATCH failed');
        }
      } catch (err) {
        console.error('Erro ao aplicar valores:', err);
      }
    })();
  };

  return (
    <div className="Agent">
      <ToastContainer />
      
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
              <h3 className="uni-box">
                Unidades: {atmCountLoading ? 'carregando...' : atmCount !== null ? atmCount : atmCountError ? 'erro' : '—'}
              </h3>

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
                  <h1 className="value-papel">{papelValue}</h1>
                  <hr style={{ width: "auto", marginTop: "5px", marginBottom: "5px" }} />
                  <p className="description">PAPEL</p>
                </div>

                <div className="card">
                  <h1 className="value-lsc">{lscValue}</h1>
                  <hr style={{ width: "auto", marginTop: "5px", marginBottom: "5px" }} />
                  <p className="description">LSC</p>
                </div>
              </div>

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

              <div
                className="info-field"
                style={{ display: showBtn ? "flex" : "none" }}
              >
                <hr className="hr-info-field" />
                <p className="info-cards">Preencha o formulário</p>

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
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>

                  <select
                    className="field-numero"
                    id="valores-id"
                    value={valoresValue}
                    onChange={(e) => setValoresValue(Number(e.target.value))}
                  >
                    {[0, 1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                <div className="field-label-select">
                  <label htmlFor="papel-id">Papel</label>
                  <label htmlFor="lsc-id">L. sem cartão</label>
                </div>
                <div className="field-select">
                  <select
                    className="field-papel"
                    id="papel-id"
                    value={papelValue}
                    onChange={(e) => setPapelValue(Number(e.target.value))}
                  >
                    {[0, 1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>

                  <select
                    className="field-lsc"
                    id="lsc-id"
                    value={lscValue}
                    onChange={(e) => setLscValue(Number(e.target.value))}
                  >
                    {[0, 1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
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