// src/pages/dashboard/Dashboard.tsx
import React, { useState, useEffect, ReactElement } from 'react';
import '../dashboard/dashboard.css';
import SideBar from '../../components/sidebar/SideBar';
import Button from '../../components/button/Button';
import { MdMenu } from "react-icons/md";
import Modal from 'react-modal';
import SearchBar from '../../components/barra-pesquisa/SearchBar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Agent {
  id: number;
  nome?: string;
  email?: string;
  usuario?: string;
  senha?: string;
  localizacao?: string;
  latitude?: number;
  longitude?: number;
  numeroDeAtms?: number;
}

function Dashboard() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'agent' | 'routes' | 'notifications' | 'home'>('agent');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
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
  const [searchQuery, setSearchQuery] = useState<string>('');

  // novo state para confirmação
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

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
    fetchAgents();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleOpenModal = () => {
    setEditingAgent(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAgent(null);
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

  // Cadastrar ou editar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const url = editingAgent
        ? `https://backend-atm-check.onrender.com/agentes/${editingAgent.id}`
        : `https://backend-atm-check.onrender.com/agentes/cadastro?adminId=2`;

      const method = editingAgent ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
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
        throw new Error(data?.message || 'Erro ao salvar usuário');
      }

      toast.success(editingAgent ? 'Usuário atualizado com sucesso!' : 'Usuário cadastrado com sucesso!');
      handleCloseModal();
      fetchAgents();
    } catch (error) {
      console.error('Erro:', error);
      toast.error(error instanceof Error ? error.message : 'Erro ao salvar usuário');
    } finally {
      setLoading(false);
    }
  };

  // abrir modal de confirmação
  const openConfirmDelete = (id: number) => {
    setConfirmDeleteId(id);
  };

  // fechar modal
  const closeConfirmDelete = () => {
    setConfirmDeleteId(null);
  };

  // confirmar exclusão
  const confirmDelete = async () => {
    if (!confirmDeleteId) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://backend-atm-check.onrender.com/agentes/${confirmDeleteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir agente');
      }

      toast.success("Agente excluído com sucesso!");
      fetchAgents();
    } catch (error) {
      console.error("Erro ao excluir agente:", error);
      toast.error(error instanceof Error ? error.message : "Erro ao excluir agente");
    } finally {
      closeConfirmDelete();
    }
  };

  // Prepara edição
  const handleEdit = (agent: Agent) => {
    setEditingAgent(agent);
    setFormData({
      agente: {
        nome: agent.nome || '',
        usuario: agent.usuario || '',
        senha: agent.senha || '',
        localizacao: agent.localizacao || '',
        latitude: agent.latitude?.toString() || '',
        longitude: agent.longitude?.toString() || ''
      },
      numeroDeAtms: agent.numeroDeAtms?.toString() || ''
    });
    setIsModalOpen(true);
  };

  const filteredAgents = agents.filter(agent => {
    const query = searchQuery.toLowerCase();
    return (
      (agent.nome ?? '').toLowerCase().includes(query) ||
      (agent.email ?? '').toLowerCase().includes(query) ||
      agent.id.toString().includes(query)
    );
  });

  return (
    <div className="Dashboard">
      <button className="menu-toggle" onClick={toggleSidebar}>
        {(MdMenu as any)({ size: 30 }) as ReactElement}
      </button>

      <SideBar
        userEmail={userEmail}
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className='container-dashboard'>
        {activeTab === 'agent' && (
          <section className='session-agent'>
            <SearchBar onSearch={setSearchQuery} />

            {/* Container fixo para resultados */}
            <div className="results-container">
              {isLoadingAgents ? (
                <div className="loading-spinner">Carregando...</div>
              ) : agentsError ? (
                <div className="error-message">{agentsError}</div>
              ) : filteredAgents.length === 0 ? (
                <div className="no-agents-message">Nenhum agente encontrado!</div>
              ) : (
                filteredAgents.map((agent) => (
                  <div key={agent.id} className="card-agent">
                    <p className='id-agent'>id: {agent.id}</p>
                    <p className='id-agent'>{agent.nome}</p>
                    <p className='id-agent'>{agent.email}</p>
                    <div className='btn-crud'>
                      <button className='btn-edit' onClick={() => handleEdit(agent)}>Editar</button>
                      <button
                        className='btn-del'
                        onClick={() => openConfirmDelete(agent.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="btn-add">
              <Button className="button-adicionar" label='Adicionar' onClick={handleOpenModal} />
            </div>
          </section>
        )}

        {activeTab === 'routes' && (
          <section className='routes'>
            <h3>Rotas</h3>
          </section>
        )}

        {activeTab === 'notifications' && (
          <section className="notifications">
            <h3>Notificações</h3>
          </section>
        )}
      </div>

      {/* Modal de cadastro/edição */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className="modal-content"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        <form onSubmit={handleSubmit} className="modal-form">
          <h2 style={{color:"#5856d6", marginTop: "30px" }}>{editingAgent ? "Editar Agente" : "Novo Agente"}</h2>

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
              style={{ width: "90dvw" }}
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
              style={{ width: "90dvw" }}
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
              style={{ width: "90dvw" }}
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
              style={{ width: "90dvw" }}
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
                style={{ width: '80%' }}
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
                style={{ width: '80%' }}
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
              style={{ width: "90dvw" }}
            />
          </div>

          <div className="modal-buttons" style={{ marginBottom: "20px" }}>
            <button type="submit" disabled={loading}>
              {loading ? (editingAgent ? 'Atualizando...' : 'Cadastrando...') : (editingAgent ? 'Atualizar' : 'Cadastrar')}
            </button>
            <button type="button" onClick={handleCloseModal}>
              Cancelar
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal de confirmação de exclusão */}
      <Modal
        isOpen={confirmDeleteId !== null}
        onRequestClose={closeConfirmDelete}
        className="modal-content"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h3>Tem certeza que deseja excluir este agente?</h3>
          <div style={{ marginTop: "20px", display: "flex", gap: "15px", justifyContent: "center" }}>
            <button
              onClick={confirmDelete}
              style={{ background: "#e74c3c", color: "white", padding: "8px 16px", borderRadius: "6px", border: "none", cursor: "pointer" }}
            >
              Excluir
            </button>
            <button
              onClick={closeConfirmDelete}
              style={{ background: "#ccc", padding: "8px 16px", borderRadius: "6px", border: "none", cursor: "pointer" }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Dashboard;