// src/pages/dashboard/Dashboard.tsx
import { MdMenu } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { ReactElement } from "react";
import React, { useState, useEffect } from 'react';
import Sideagent from '../../components/agente-sidebar/Sideagent';
import '../agent/agent.css';

function Agent() {
  const [showBtn, setShowBtn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userUsuario, setUserUsuario] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'agent' | 'routes' | 'notifications' >('agent');

  // Estados para os valores dos cards
  const [sistemaValue, setSistemaValue] = useState<number>(0);
  const [valoresValue, setValoresValue] = useState<number>(0);
  const [papelValue, setPapelValue] = useState<string>("Disponivel"); // Valor inicial
  const [lscValue, setLscValue] = useState<string>("Indisponivel"); // Valor inicial

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    const usuario = localStorage.getItem('userUsuario');
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
    // Aqui você pode adicionar a lógica para salvar os valores, se necessário
    // Por enquanto, apenas fechamos o formulário de edição após aplicar.
    setShowBtn(false);
    alert('Valores aplicados!');
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

      <div className='container'>
        {activeTab === 'agent' && (
          <section className='session-agent'>
            <div className="container-agent">

              <p className='id-user-agent'>
                ID: {userUsuario ? userUsuario : "Não definido"}
              </p>

              <h3 className='uni-box'>Unidades: { }</h3> {/* Mantido conforme original */}

              <div className="box-card">
                <div className="card">
                  <h1 className='value-sistem'>{sistemaValue}</h1>
                  <hr style={{width:"auto", marginTop:"10px"}}/>
                  <p className='description' style={{paddingTop:"3px"}}>Sistema</p>
                </div>

                <div className="card">
                  <h1 className='value-val'>{valoresValue}</h1>
                  <hr style={{width:"auto", marginTop:"10px"}}/>
                  <p className='description' style={{paddingTop:"3px"}}>Valores</p>
                </div>

                <div className="card">
                  <h1 className='value-papel' style={{fontSize:"14pt"}}>{papelValue === "Disponivel" ? "Indisponivel" : "Indisponivel"}</h1> {/* Exibe o texto do select */}
                  <hr style={{width:"auto", marginTop:"10px"}}/>
                  <p className='description' style={{paddingTop:"3px"}}>Papel</p>
                </div>

                <div className="card">
                  <h1 className='value-lsc' style={{fontSize:"14pt"}}>{lscValue === "Disponivel" ? "Disponivel" : "Indisponivel"}</h1>
                  <hr style={{width:"auto", marginTop:"10px"}}/>
                  <p className='description' style={{paddingTop:"3px"}}>L. sem cartão</p>
                </div>
              </div>

              <div className="edit-icon">
                <button className="btn-edit-field" onClick={handleShowBtnEdit}>
                  {(FiEdit as any)({ size: 24, style: { cursor: 'pointer', color: 'white' } }) as ReactElement}
                </button>
              </div>

              {/* campos de informação dos cards*/}
              <div className="info-field" style={{ display: showBtn ? 'flex' : 'none' }}>
                <p className="info-cards">Preencha o formulário</p>
                <input
                  className="field-info-card"
                  placeholder="Sistema"
                  type="number"
                  value={sistemaValue}
                  onChange={(e) => setSistemaValue(Number(e.target.value))}
                />
                <input
                  className="field-info-card"
                  placeholder="Valores"
                  type="number"
                  value={valoresValue}
                  onChange={(e) => setValoresValue(Number(e.target.value))}
                />

                <div className="field-label-select">
                  <label className="papel" htmlFor="papel-id">Papel</label>
                  <label className="lsc" htmlFor="papel-id">L.Sem cartão</label>
                </div>

                <div className="field-select">
                  <select
                    className="field-papel"
                    name="papel"
                    id="papel-id"
                    value={papelValue}
                    onChange={(e) => setPapelValue(e.target.value)}
                  >
                    <option value="Com papel">Com papel</option>
                    <option value="Sem papel">Sem papel</option>
                  </select>

                  <select
                    className="field-lsc"
                    name="papel"
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
              <button className='btn-aplicar' onClick={handleAplicar}>Aplicar</button>
            </div>
          </section>
        )}

        {activeTab === 'routes' && (
          <section className='routes'>
            <h3>chat</h3>
          </section>
        )}

        {activeTab === 'notifications' && (
          <section className="notifications">
            <h3>Notificações</h3>
          </section>
        )}
      </div>
    </div>
  );
}

export default Agent;