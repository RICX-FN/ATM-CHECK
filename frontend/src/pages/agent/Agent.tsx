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

  // estados para contagem de ATMs do agente logado
  const [atmCount, setAtmCount] = useState<number | null>(null);
  const [atmCountLoading, setAtmCountLoading] = useState<boolean>(false);
  const [atmCountError, setAtmCountError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Current token:', token);
    if (!token) {
      console.warn('No token found in localStorage — continuing without auth header');
      // do not redirect; allow UI to load and requests will be sent without Authorization if needed
    }

    const email = localStorage.getItem("userEmail");
    const usuario = localStorage.getItem("userUsuario");

    // Get ATM ID from storage (do not fallback to a hardcoded id)
    const storedAtmId = findAtmIdFromStorage();
    console.log('Initial atmId:', storedAtmId);

    setUserEmail(email);
    setUserUsuario(usuario);
    if (storedAtmId) {
      setAtmId(storedAtmId);
      console.log('Set atmId state to:', storedAtmId);

      // Store ATM ID in both storages for persistence
      localStorage.setItem('atmId', storedAtmId);
      sessionStorage.setItem('atmId', storedAtmId);
    } else {
      console.warn('No atmId available in storage; user must select or be assigned an ATM before applying changes.');
    }

    // tentar obter id do agente (várias chaves possíveis)
    const storedAgentId =
      localStorage.getItem("userId") ||
      localStorage.getItem("agentId") ||
      localStorage.getItem("id") ||
      null;

    // buscar contagem de ATMs do agente, se temos agentId
    if (storedAgentId) {
      fetchAgentAtmCount(storedAgentId);
    }

    // se houver atmId, buscar dados do ATM para popular a tela
    if (storedAtmId) {
      fetchAtm(storedAtmId);
    }
  }, []);

  // tenta localizar atmId em várias chaves comuns no localStorage e sessionStorage
  const findAtmIdFromStorage = (): string | null => {
    const keys = ['atmId', 'atmID', 'idAtm', 'id_atm', 'atmid', 'atm_id', 'id', 'ATM_ID'];

    // Check localStorage
    for (const k of keys) {
      const v = localStorage.getItem(k);
      if (v) {
        console.log('Found atmId in localStorage:', k, v);
        return v;
      }
    }

    // Check sessionStorage
    for (const k of keys) {
      const v = sessionStorage.getItem(k);
      if (v) {
        console.log('Found atmId in sessionStorage:', k, v);
        return v;
      }
    }

    console.log('No atmId found in storage');
    return null;
  };

  // Busca dados do ATM e popula os estados da tela
  const fetchAtm = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      // do not redirect on missing token; just call API without Authorization if absent
      if (!token) {
        console.warn('No token available; calling fetchAtm without Authorization header');
      }
      const res = await fetch(`https://backend-atm-check.onrender.com/atms/${id}`, {
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          'Content-Type': 'application/json'
        }
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

  // Busca a contagem de ATMs para um agente
  const fetchAgentAtmCount = async (id: string): Promise<number | null> => {
    setAtmCountLoading(true);
    setAtmCountError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://backend-atm-check.onrender.com/agentes/${id}/atm-count`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : undefined
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `HTTP ${res.status}`);
      }

      const data = await res.json().catch(() => null);
      if (data == null) throw new Error('Resposta inválida');

      let count: number | null = null;
      if (typeof data === 'number') count = data;
      else if (typeof data.count === 'number') count = data.count;
      else if (typeof data.numeroDeAtms === 'number') count = data.numeroDeAtms;
      else if (typeof data.atmCount === 'number') count = data.atmCount;

      if (count == null) {
        const firstNum = Object.values(data).find(v => typeof v === 'number') as number | undefined;
        if (firstNum !== undefined) count = firstNum;
      }

      if (count == null) throw new Error('Não foi possível determinar a contagem');
      setAtmCount(count);
      return count;
    } catch (err: any) {
      console.error('Erro ao buscar contagem de ATMs do agente:', err);
      setAtmCountError(err.message || 'Erro ao buscar contagem');
      return null;
    } finally {
      setAtmCountLoading(false);
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

    // Get ATM ID from state or storage; do not use a fallback fake id
    const currentAtmId = atmId || findAtmIdFromStorage();
    console.log('Attempting to update ATM with ID:', currentAtmId);

    if (!currentAtmId) {
      console.error('No ATM ID found; aborting update to avoid 404');
      alert('ID do ATM não definido. Selecione um ATM válido antes de aplicar.');
      return;
    }

    // Persist the id just in case
    localStorage.setItem('atmId', currentAtmId);
    sessionStorage.setItem('atmId', currentAtmId);
    setAtmId(currentAtmId);

    (async () => {
      try {
        const token = localStorage.getItem('token');

        // determine numeroDeAtms to send: prefer state, otherwise try fetching from agent endpoint
        let countToSend: number | null = atmCount;
        if (countToSend == null) {
          const storedAgentId = localStorage.getItem("userId") || localStorage.getItem("agentId") || localStorage.getItem("id") || null;
          if (storedAgentId) {
            countToSend = await fetchAgentAtmCount(storedAgentId);
          }
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

        // Verify ATM exists before attempting update
        try {
          const verifyRes = await fetch(`https://backend-atm-check.onrender.com/atms/${currentAtmId}`, {
            method: 'GET',
            headers: {
              ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
              'Content-Type': 'application/json'
            }
          });

          if (verifyRes.status === 404) {
            console.error('ATM not found (404) for id:', currentAtmId);
            alert('ATM não encontrado. Verifique o ID antes de aplicar.');
            return;
          }

          // proceed, but reuse existingData fetch below if needed
        } catch (verifyErr) {
          console.warn('Error verifying ATM existence, continuing to attempt update', verifyErr);
        }

        // 1) Try PATCH with minimal payload (safer for partial updates)
        try {
          console.log('Attempting PATCH with payload:', minimalPayload);
          const patchRes = await fetch(`https://backend-atm-check.onrender.com/atms/${currentAtmId}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(minimalPayload)
          });

          if (patchRes.ok) {
            const data = await patchRes.json().catch(() => null);
            console.log('PATCH success response:', data);
            alert('Valores aplicados com sucesso (PATCH)!');
            return;
          }

          // if PATCH returned 405 Method Not Allowed, or other 4xx, proceed to PUT fallback
          const patchText = await patchRes.text().catch(() => '');
          console.warn('PATCH failed, status:', patchRes.status, 'body:', patchText);
        } catch (patchErr) {
          console.warn('PATCH attempt failed:', patchErr);
        }

        // 2) Fallback: fetch existing ATM and merge
        // Fetch current ATM data to preserve fields like localizacao
        let existingData: any = {};
        try {
          const getRes = await fetch(`https://backend-atm-check.onrender.com/atms/${currentAtmId}`, {
            headers: {
              ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
              'Content-Type': 'application/json'
            }
          });
          if (getRes.ok) {
            existingData = await getRes.json().catch(() => ({}));
            console.log('Fetched existing ATM data:', existingData);
          } else {
            const txt = await getRes.text().catch(() => '');
            console.warn('Could not fetch existing ATM data, proceeding with best-effort payload:', getRes.status, txt);
          }
        } catch (err) {
          console.warn('Error fetching existing ATM data, proceeding with best-effort payload', err);
        }

        // Build payload in the exact shape backend expects
        const apiPayload: {
          dinheiro: boolean;
          localizacao?: string;
          papel: boolean;
          levantamentoSemCartao: boolean;
          sistema: boolean;
        } = {
          dinheiro: Number(valoresValue) > 0,
          localizacao: existingData?.localizacao ?? existingData?.localizacaoAtm ?? '',
          papel: papelValue === 'Com papel',
          levantamentoSemCartao: lscValue === 'Com Levantamento',
          sistema: Number(sistemaValue) > 0
        };

        // Remove undefined fields (typed)
        (Object.keys(apiPayload) as Array<keyof typeof apiPayload>).forEach((k) => {
          if (apiPayload[k] === undefined) {
            delete apiPayload[k];
          }
        });

        console.log('Sending API payload (expected schema):', apiPayload);

        // First try PATCH
        try {
          const patchRes2 = await fetch(`https://backend-atm-check.onrender.com/atms/${currentAtmId}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(apiPayload)
          });

          if (patchRes2.ok) {
            const data = await patchRes2.json().catch(() => null);
            console.log('PATCH success response:', data);
            alert('Valores aplicados com sucesso (PATCH)!');
            return;
          }

          const patchText2 = await patchRes2.text().catch(() => '');
          console.warn('PATCH failed, status:', patchRes2.status, 'body:', patchText2);
        } catch (patchErr2) {
          console.warn('PATCH attempt failed:', patchErr2);
        }

        // Fallback to PUT with same apiPayload
        const putRes2 = await fetch(`https://backend-atm-check.onrender.com/atms/${currentAtmId}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(apiPayload)
        });

        if (!putRes2.ok) {
          const errBody2 = await putRes2.text().catch(() => '');
          console.error('PUT failed:', putRes2.status, errBody2);
          throw new Error(`Erro ao atualizar ATM: ${putRes2.status} ${errBody2}`);
        }

        const putData2 = await putRes2.json().catch(() => null);
        console.log('PUT success response:', putData2);
        alert('Valores aplicados com sucesso (PUT)!');
      } catch (err) {
        console.error('Erro ao aplicar valores:', err);
        alert(err instanceof Error ? err.message : 'Erro ao aplicar valores');
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
              <h3 className="uni-box">
                Unidades: {atmCountLoading ? 'carregando...' : atmCount !== null ? atmCount : atmCountError ? 'erro' : '—'}
              </h3>

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