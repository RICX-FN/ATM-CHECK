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

        <form onSubmit={handleSubmit}>
          <EmailInput value={email} onChange={(e) => setEmail(e.target.value)} required />
            
          <Button label="Clique Aqui" />
        </form>

      </div>
    );
  }

  export default LoginAdmin;