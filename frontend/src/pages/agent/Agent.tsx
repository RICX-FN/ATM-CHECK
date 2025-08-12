// src/pages/dashboard/Dashboard.tsx

import React, { useState, useEffect } from 'react';
import Sideagent from '../../components/agente-sidebar/Sideagent';

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
              <h3>agent</h3>
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