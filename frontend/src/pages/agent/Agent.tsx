// src/pages/dashboard/Dashboard.tsx
import { MdOutlineEdit, MdMenu } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { ReactElement } from "react";
import React, { useState, useEffect } from 'react';
import Sideagent from '../../components/agente-sidebar/Sideagent';
import '../agent/agent.css';
import SideBar from "../../components/sidebar/SideBar";

function Agent() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'agent' | 'routes' | 'notifications'>('agent');

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    setUserEmail(email);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="Agent">
      <button className="menu-toggle" onClick={toggleSidebar}>
              {(MdMenu as any)({ size: 30 }) as ReactElement}
            </button>

      {/* Agora passando activeTab para o SideBar */}
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

              <p className='id-user-agent'>ID: user{ }</p>
              <h3 className='uni-box'>Unidades: { }</h3>

              <div className="box-card">
                <div className="card">
                  <h1 className='value-sistem'>0</h1>
                  <p className='description'>Descrição</p>
                </div>

                <div className="card">
                  <h1 className='value-val'>0</h1>
                  <p className='description'>Descrição</p>
                </div>

                <div className="card">
                  <h1 className='value-papel'>0</h1>
                  <p className='description'>Descrição</p>
                </div>

                <div className="card">
                  <h1 className='value-lsc'>0</h1>
                  <p className='description'>Descrição</p>
                </div>
              </div>
              
              <div className="edit-icon">
                {(FiEdit as any)({ size: 24, style: { cursor: 'pointer' } }) as ReactElement}
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
            {/* Conteúdo das rotas */}
          </section>
        )}

        {activeTab === 'notifications' && (
          <section className="notifications">
            <h3>Notificações</h3>
            {/* Conteúdo das notificações */}
          </section>
        )}
      </div>
    </div>
  );
}

export default Agent;