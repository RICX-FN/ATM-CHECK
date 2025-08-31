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

      // Passo 1: Verifique se a resposta não foi bem-sucedida.
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Credenciais inválidas. Tente novamente.");
        } else {
          throw new Error(`Erro do servidor (${response.status})`);
        }
      }

      // Passo 2: Verifique o tipo de conteúdo da resposta.
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        // Se não for JSON, trate como um erro ou falha inesperada.
        const errorText = await response.text();
        console.error("Resposta do servidor não é JSON:", errorText);
        throw new Error("Resposta inesperada do servidor. Tente novamente mais tarde.");
      }

      // Passo 3: Se tudo estiver ok, processe o JSON.
      const result = await response.json();

      // Armazena o token no cookie
      document.cookie = `token=${result.token}; path=/; max-age=86400`;

      localStorage.setItem("userUsuario", data.usuario);

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
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h1 className="title-login">ATM CHECK</h1>
          <p className='quemsou'>Agent, faça login.</p>

          <div className={`input-group ${errors.usuario ? 'input-error' : ''}`}>
            <EmailInput {...register("usuario", { required: "Usuario obrigatorio." })} type="text" placeholder="Digite seu usuário"/>
            {errors.usuario && <span className="erro-msg-email">{errors.usuario.message}</span>}
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

export default LoginAgent;