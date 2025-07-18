// Importando a biblioteca React
import React from 'react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import BtnLogout from '../btn-logout/BtnLogout';
import { MdSupportAgent } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";



function SideBar() {
  return (

    <aside>
      <div className="conteiner-sidebar">
        <div className="content-perfil">
          <h3 className='tittle'>Dashboard</h3>
        </div>

        <div className="content-links">
          <nav>

            <Link to="/" className='btn-sidebar'>
              {(MdSupportAgent as any)({ size: 25, style: { color: '#fff', transition: '.7s ease;' } }) as ReactElement}
              <span className='icon-sidebar'>Agentes</span>
            </Link>

            <Link to="/" className='btn-sidebar'>
              {(FaLocationDot as any)({ size: 25, style: { color: '#fff', transition: '.7s ease;' } }) as ReactElement}
              <span className='icon-sidebar'>Rotas</span>
            </Link>

            <Link to="/" className='btn-sidebar'>
              {(IoNotifications as any)({ size: 25, style: { color: '#fff', transition: '.7s ease;' } }) as ReactElement}
              <span className='icon-sidebar'>Notificações</span>
            </Link>

          </nav>
        </div>

        <div className="content-logout">
          <p className='user-mail'>user@gmail.com</p>
          <hr />
          <BtnLogout />
        </div>
      </div>
    </aside>
  );
}

export default SideBar;