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
    formState: { errors, isSubmitting }
  } = useForm<LoginForm>();

  const navigate = useNavigate();
  const [erro, setErro] = useState("");

  const onSubmit = async (data: LoginForm) => {
    setErro("");

    try {
      const response = await fetch("https://backend-atm-check.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Credenciais inválidas. Tente novamente.");
        } else {
          throw new Error(`Erro do servidor (${response.status})`);
        }
      }

      const result = await response.json();

      // Armazena o token no cookie
      document.cookie = `token=${result.token}; path=/; max-age=86400`;

      // 👉 Salva o email do usuário no localStorage
      localStorage.setItem("userEmail", data.email);
      
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Erro na requisição:", error);
      setErro(error.message === "Failed to fetch"
        ? "Erro de conexão com o servidor"
        : error.message);
    }
  };

  return (
    <div className="LoginAdmin">
      <div className="container-login">

        {/* Botão de voltar em forma de seta */}
        <button 
          onClick={() => navigate("/")} 
          className="botao-voltar"
          aria-label="Voltar para Home"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="icon-seta"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h1 className="title-login">ATM CHECK</h1>
          <p className='quemsou'>Admin, faça login.</p>

          <div className={`input-group ${errors.email ? 'input-error' : ''}`}>
            <EmailInput {...register("email", { required: "Email é obrigatório." })} />
            {errors.email && <span className="erro-msg-email">{errors.email.message}</span>}
          </div>

          <div className={`input-group ${errors.senha ? 'input-error' : ''}`}>
            <PasswordInput {...register("senha", { required: "Senha é obrigatória." })} />
            {errors.senha && <span className="erro-msg-senha">{errors.senha.message}</span>}
          </div>

          <Button
            className='btn-login'
            label={isSubmitting ? "Entrando..." : "Entrar"}
            disabled={isSubmitting}
          />

          {erro && <p className="erro-msg-cre">{erro}</p>}
        </form>
      </div>
    </div>
  );
}

export default LoginAdmin;