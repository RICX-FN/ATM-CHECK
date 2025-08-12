// src/pages/dashboard/Dashboard.tsx

import React, { useState, useEffect } from 'react';
import '../dashboard/dashboard.css';
import SideBar from '../../components/sidebar/SideBar';
import Button from '../../components/button/Button';
import { MdOutlineEdit, MdMenu } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

function Dashboard() {
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
    <div className="Dashboard">
      <button className="menu-toggle" onClick={toggleSidebar}>
        {(MdMenu as any)({ size: 30 })}
      </button>

      {/* Passando setActiveTab para o SideBar */}
      <SideBar 
        userEmail={userEmail} 
        isOpen={isSidebarOpen} 
        onTabChange={setActiveTab} 
      />

      <div className='container'>
        {activeTab === 'agent' && (
          <section className='session-agent'> 
            <div className="card-agent">
              <h3 className='id-h3'>ID</h3>
              <p className="id-agent">id</p>

              <div className="btn-crud">
                <button className='btn-edit' title="Editar">
                  {(MdOutlineEdit as any)({ size: 28 })}
                </button>
                <button className='btn-del' title="Deletar">
                  {(RiDeleteBin5Line as any)({ size: 28 })}
                </button>
              </div>
            </div>

            <div className="btn-add">
              <Button className="button-adicionar" label='Adicionar'/>
            </div>
          </section>
        )}

        {activeTab === 'routes' && (
          <section className='routes'>
            <h3>Lista de Rotas</h3>
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

export default Dashboard;
