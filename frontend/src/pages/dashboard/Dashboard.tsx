// src/pages/Dashboard.tsx

import React, { useState, useEffect } from 'react';
import '../dashboard/dashboard.css';
import SideBar from '../../components/sidebar/SideBar';
import Button from '../../components/button/Button';
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

function Dashboard() {
  // 👉 1. Adiciona um estado para o e-mail do usuário
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // 👉 2. Lê o e-mail do localStorage quando o componente é renderizado
    const email = localStorage.getItem('userEmail');
    setUserEmail(email);
  }, []);

  return (
    <div className="Dashboard">
      {/* 👉 3. Passa o estado do e-mail como uma prop para a SideBar */}
      <SideBar userEmail={userEmail} />
      <div className='container'>

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

        <section className='routes'></section>
        <section className="notifications"></section>
      </div>
    </div>
  );
}

export default Dashboard;