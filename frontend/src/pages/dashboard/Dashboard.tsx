// src/pages/dashboard/Dashboard.tsx

import React, { useState, useEffect } from 'react';
import '../dashboard/dashboard.css';
import SideBar from '../../components/sidebar/SideBar';
import Button from '../../components/button/Button';
import { MdOutlineEdit, MdMenu } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ReactElement } from 'react';
import Modal from 'react-modal';

interface Agent {
  id: number;
  nome: string;
  email: string;
}

function Dashboard() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'agent' | 'routes' | 'notifications' | 'home'>('agent');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: ''
  });
  const [loading, setLoading] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoadingAgents, setIsLoadingAgents] = useState(true);
  const [agentsError, setAgentsError] = useState<string | null>(null);

  const fetchAgents = async () => {
    setIsLoadingAgents(true);
    setAgentsError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://backend-atm-check.onrender.com/agentes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Erro ao buscar agentes');
      }
      
      const data = await response.json();
      setAgents(data);
    } catch (error) {
      console.error('Erro ao buscar agentes:', error);
      setAgentsError(error instanceof Error ? error.message : 'Erro ao buscar agentes');
    } finally {
      setIsLoadingAgents(false);
    }
  };

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    setUserEmail(email);
    fetchAgents(); // Busca os agentes quando o componente monta
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ nome: '', email: '', senha: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://backend-atm-check.onrender.com/agentes/cadastro?adminId=2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
        })
      });

      const data = await response.json().catch(() => null);
      
      if (!response.ok) {
        throw new Error(data?.message || 'Erro ao cadastrar usuário');
      }

      alert('Usuário cadastrado com sucesso!');
      handleCloseModal();
      fetchAgents(); // Atualiza a lista de agentes
    } catch (error) {
      console.error('Erro:', error);
      alert(error instanceof Error ? error.message : 'Erro ao cadastrar usuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Dashboard">
      <button className="menu-toggle" onClick={toggleSidebar}>
        {(MdMenu as any)({ size: 30 }) as ReactElement}
      </button>

      {/* Agora passando activeTab para o SideBar */}
      <SideBar
        userEmail={userEmail}
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className='container'>
                {activeTab === 'agent' && (
          <section className='session-agent'>
            {isLoadingAgents ? (
              <div className="loading-spinner">Carregando...</div>
            ) : agentsError ? (
              <div className="error-message">{agentsError}</div>
            ) : agents.length === 0 ? (
              <div className="no-agents-message">Nenhum agente cadastrado</div>
            ) : (
              <>
                {agents.map((agent) => (
                  <div key={agent.id} className="card-agent">
                    <p className='id-agent'>id:{agent.id}</p>
                    <p className='id-agent'>{agent.nome}</p>
                    <p className='id-agent'>{agent.email}</p>
                    <div className='btn-crud'>
                      <button className='btn-edit'>Editar</button>
                      <button className='btn-del'>Excluir</button>
                    </div>
                  </div>
                ))}
              </>
            )}
            <div className="btn-add">
              <Button className="button-adicionar" label='Adicionar' onClick={handleOpenModal} />
            </div>
          </section>
        )}

        {activeTab === 'routes' && (
          <section className='routes'>
            <h3>Rotas</h3>
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className="modal-content"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        <div className="modal-header">
          <h2>Novo Agente</h2>
          <button onClick={handleCloseModal} className="close-button">×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="submit" disabled={loading}>
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
            <button type="button" onClick={handleCloseModal}>
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Dashboard;