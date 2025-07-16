import React, { useState } from 'react';
import '../login-agent/login-agent.css';
import Button from '../../components/button/Button';
import EmailInput from '../../components/email-input/EmailInput'

function LoginAgent() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`E-mail enviado: ${email}`);
  };

  return (
    <div className="LoginAgent">
      <form onSubmit={handleSubmit}>
        <h1>ATM CHECK</h1>
        <p>Sou um Agente, faça login.</p>

        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} required />

        <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} required />

        <Button label="Entrar" />

        <div className="check-session">
          <input type="checkbox" className='check-conect' name="check" id="check" />
          <label htmlFor="check">Mantenha-me Conectado</label>
        </div>
      </form>

    </div>
  );
}

export default LoginAgent;