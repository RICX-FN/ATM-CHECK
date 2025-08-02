import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import '../../styles/login-global.css';
import Button from '../../components/button/Button';
import EmailInput from '../../components/email-input/EmailInput';
import PasswordInput from '../../components/senha-input/PasswordInput';

type LoginForm = {
  email: string;
  senha: string;
};

function LoginAdmin() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>();

  const navigate = useNavigate();
  const [erro, setErro] = useState("");

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await fetch("https://backend-atm-check.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const result = await response.json();

      // Armazena o token no cookie
      document.cookie = `token=${result.token}; path=/; max-age=86400`; // 1 dia

      // Redireciona
      navigate("/dashboard");
    } catch (error) {
      setErro("Email ou senha incorretos");
    }
  };

  return (
    <div className="LoginAdmin">
      <div className="conteiner-login">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>ATM CHECK</h1>
          <p className='quemsou'>Sou um Admin, faça login.</p>

          {erro && <p style={{ color: "red" }}>{erro}</p>}

          <EmailInput {...register("email", { required: "Email é obrigatório" })} />
          
          <PasswordInput {...register("senha", { required: "Senha é obrigatória" })} />

          {errors.senha && (
            <span className="erro-msg">{errors.senha.message}</span>
          )}

          <Button className='btn-login' label="Entrar" />

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
