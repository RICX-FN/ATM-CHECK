import React, { useState } from 'react';
import '../login-admin/login-admin.css';
import Button from '../../components/button/Button';
import EmailInput from '../../components/email-input/EmailInput'

function LoginAdmin() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`E-mail enviado: ${email}`);
  };

  return (
    <div className="Login-Admin">
      <div className="login-box">
        <h1> ATM CHECK</h1>
        <h2>Admistrador faça o seu login</h2>

        <form onSubmit={handleSubmit}>
          <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} required />
          <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Button label="Entrar" />
        </form>
      </div>
    </div>
  );
}

export default LoginAdmin;