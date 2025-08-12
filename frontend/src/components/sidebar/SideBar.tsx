// src/components/sidebar/SideBar.tsx

import '../sidebar/sidebar.css';
import { ReactElement } from 'react';
import BtnLogout from '../btn-logout/BtnLogout';
import { MdSupportAgent } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";

interface SideBarProps {
  userEmail: string | null;
  isOpen: boolean;
  activeTab: 'agent' | 'routes' | 'notifications';
  onTabChange: (tab: 'agent' | 'routes' | 'notifications') => void;
}

function SideBar({ userEmail, isOpen, activeTab, onTabChange }: SideBarProps) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="conteiner-sidebar">

        {/* Título */}
        <div className="content-perfil">
          <h3 className='tittle'>Dashboard</h3>
        </div>

        {/* Navegação */}
        <div className="content-links">
          <nav>
            <p className='navegacao'>Navegação</p>

            <button
              className={`btn-sidebar ${activeTab === 'agent' ? 'active' : ''}`}
              onClick={() => onTabChange('agent')}
            >
              {(MdSupportAgent as any)({
                size: 25,
                style: { margin: '-6px 1px', color: activeTab === 'agent' ? 'gray' : '#fff' }
              }) as ReactElement}
              <span className='icon-sidebar' style={{ color: activeTab === 'agent' ? 'gray' : '#fff' }}>
                Agentes
              </span>
            </button>

            <button
              className={`btn-sidebar ${activeTab === 'routes' ? 'active' : ''}`}
              onClick={() => onTabChange('routes')}
            >
              {(FaLocationDot as any)({
                size: 25,
                style: { margin: '-6px 1px', color: activeTab === 'routes' ? 'gray' : '#fff' }
              }) as ReactElement}
              <span className='icon-sidebar' style={{ color: activeTab === 'routes' ? 'gray' : '#fff' }}>
                Rotas
              </span>
            </button>

            <button
              className={`btn-sidebar ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => onTabChange('notifications')}
            >
              {(IoNotifications as any)({
                size: 25,
                style: { margin: '-6px 1px', color: activeTab === 'notifications' ? 'gray' : '#fff' }
              }) as ReactElement}
              <span className='icon-sidebar' style={{ color: activeTab === 'notifications' ? 'gray' : '#fff' }}>
                Notificações
              </span>
            </button>
          </nav>
        </div>

        {/* Logout */}
        <div className="content-logout">
          {userEmail && <p className='user-mail'>{userEmail}</p>}
          <hr />
          <BtnLogout />
        </div>
      </div>
    </aside>
  );
}

export default SideBar;