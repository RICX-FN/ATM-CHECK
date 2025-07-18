import React, { useState } from 'react';
import '../../styles/login-global.css';
import Button from '../../components/button/Button';
import EmailInput from '../../components/email-input/EmailInput'
import PasswordInput from '../../components/senha-input/PasswordInput'

function LoginAdmin() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`E-mail enviado: ${email}`);
  };

  return (
    <div className="LoginAdmin">
      <div className="conteiner-login">
        <form onSubmit={handleSubmit}>
          <h1>ATM CHECK</h1>
          <p>Sou um Admin, faça login.</p>

          <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} required />

          <PasswordInput />

          <Button label="Entrar"/>

          <div className="check-session">
            <input type="checkbox" className='check-conect' name="check" id="check" />
            <label htmlFor="check">Mantenha-me Conectado</label>
          </div>
        </form>

      </div>
    </div>
  );
}

export default LoginAdmin;