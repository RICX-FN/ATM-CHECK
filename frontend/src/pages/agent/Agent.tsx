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
  const [activeTab, setActiveTab] = useState<'agent' | 'routes' | 'notifications'>('agent');

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

              {/* Agora mostra o usuário que veio do back */}
              <p className='id-user-agent'>
                ID: {userUsuario ? userUsuario : "Não definido"}
              </p>

              <h3 className='uni-box'>Unidades: { }</h3>

              <div className="box-card">
                <div className="card">
                  <h1 className='value-sistem'>0</h1>
                  <p className='description'>Sistema</p>
                </div>

                <div className="card">
                  <h1 className='value-val'>0</h1>
                  <p className='description'>Valores</p>
                </div>

                <div className="card">
                  <h1 className='value-papel'>0</h1>
                  <p className='description'>Papel</p>
                </div>

                <div className="card">
                  <h1 className='value-lsc'>0</h1>
                  <p className='description'>Levantamento sem cartão</p>
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
                <input className="field-info-card" placeholder="Sistema" type="number" />
                <input className="field-info-card" placeholder="Valores" type="number" />

                <div className="field-label-select">
                  <label className="papel" htmlFor="papel-id">Papel</label>
                  <label className="lsc" htmlFor="papel-id">L.Sem cartão</label>
                </div>

                <div className="field-select">
                  <select className="field-papel" name="papel" id="papel-id">
                    <option value="Com papel">Com papel</option>
                    <option value="Sem papel">Sem papel</option>
                  </select>

                  <select className="field-lsc" name="papel" id="lsc-id">
                    <option value="Com papel">Sem Levantamento</option>
                    <option value="Sem papel">Com Levantamento</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field-btn">
              <button className='btn-aplicar'>Aplicar</button>
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