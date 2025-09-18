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
    agente: {
      nome: '',
      usuario: '',
      senha: '',
      localizacao: '',
      latitude: '',
      longitude: ''
    },
    numeroDeAtms: ''
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
    setFormData({
      agente: {
        nome: '',
        usuario: '',
        senha: '',
        localizacao: '',
        latitude: '',
        longitude: ''
      },
      numeroDeAtms: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'numeroDeAtms') {
      setFormData({
        ...formData,
        [name]: value
      } as any);
    } else {
      setFormData({
        ...formData,
        agente: {
          ...formData.agente,
          [name]: value
        }
      });
    }
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
          agente: {
            nome: formData.agente.nome,
            usuario: formData.agente.usuario,
            senha: formData.agente.senha,
            localizacao: formData.agente.localizacao,
            latitude: Number(formData.agente.latitude),
            longitude: Number(formData.agente.longitude)
          },
          numeroDeAtms: Number(formData.numeroDeAtms)
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
      <div className='container-dashboard'>
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
        <form onSubmit={handleSubmit} className="modal-form">
          <h2 style={{textAlign:"right"}}>Novo Agente</h2>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder='Fulano'
              value={formData.agente.nome}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="apelido ou login"
              value={formData.agente.usuario}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="********"
              value={formData.agente.senha}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="localizacao">Localização</label>
            <input
              type="text"
              id="localizacao"
              name="localizacao"
              placeholder="Cidade / Endereço"
              value={formData.agente.localizacao}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                step="any"
                id="latitude"
                name="latitude"
                placeholder="-23.0000"
                value={formData.agente.latitude}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                step="any"
                id="longitude"
                name="longitude"
                placeholder="-46.0000"
                value={formData.agente.longitude}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="numeroDeAtms">Número de ATMs</label>
            <input
              type="number"
              id="numeroDeAtms"
              name="numeroDeAtms"
              placeholder="0"
              value={formData.numeroDeAtms}
              onChange={handleInputChange}
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