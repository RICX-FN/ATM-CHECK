import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import '../../styles/login-global.css';
import Button from '../../components/button/Button';
import EmailInput from '../../components/email-input/EmailInput';
import PasswordInput from '../../components/senha-input/PasswordInput';

type LoginForm = {
  usuario: string;
  senha: string;
};

function LoginAgent() {
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
      const response = await fetch("https://backend-atm-check.onrender.com/agentes/login", {
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

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const errorText = await response.text();
        console.error("Resposta do servidor não é JSON:", errorText);
        throw new Error("Resposta inesperada do servidor. Tente novamente mais tarde.");
      }

      const result = await response.json();

      if (result.token) {
        document.cookie = `token=${result.token}; path=/; max-age=86400`;
      }

      if (result.id) {
        localStorage.setItem("userId", result.id);
      }
      if (result.usuario) {
        localStorage.setItem("userUsuario", result.usuario);
      }
      if (result.email) {
        localStorage.setItem("userEmail", result.email);
      }

      navigate("/agent");
    } catch (error: any) {
      console.error("Erro na requisição:", error);
      setErro(error.message === "Failed to fetch"
        ? "Erro de conexão com o servidor"
        : error.message);
    }
  };

  return (
    <div className="LoginAgent">
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
          <p className='quemsou'>Agent, faça login.</p>

          <div className={`input-group ${errors.usuario ? 'input-error' : ''}`}>
            <EmailInput
              {...register("usuario", { required: "Usuario obrigatorio." })}
              type="text"
              placeholder="Digite seu usuário"
            />
            {errors.usuario && <span className="erro-msg-email">{errors.usuario.message}</span>}
          </div>

          <div className={`input-group ${errors.senha ? 'input-error' : ''}`}>
            <PasswordInput
              {...register("senha", { required: "Senha é obrigatória." })}
            />
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

export default LoginAgent;