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
    setErro(""); // limpa o erro antes da requisição

    try {
      const response = await fetch("https://backend-atm-check.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Credenciais inválidas");
        } else {
          throw new Error(`Erro do servidor (${response.status})`);
        }
      }

      const result = await response.json();

      // Armazena o token no cookie
      document.cookie = `token=${result.token}; path=/; max-age=86400`; // 1 dia

      // Redireciona
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
      <div className="conteiner-login">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h1>ATM CHECK</h1>
          <p className='quemsou'>Sou um Admin, faça login.</p>

          {erro && <p className="erro-msg">{erro}</p>}

          <div className={`input-group ${errors.email ? 'input-error' : ''}`}>
            <EmailInput {...register("email", { required: "Email é obrigatório" })} />
            {errors.email && <span className="erro-msg">{errors.email.message}</span>}
          </div>

          <div className={`input-group ${errors.senha ? 'input-error' : ''}`}>
            <PasswordInput {...register("senha", { required: "Senha é obrigatória" })} />
            {errors.senha && <span className="erro-msg">{errors.senha.message}</span>}
          </div>

          <Button
            className='btn-login'
            label={isSubmitting ? "Entrando..." : "Entrar"}
            disabled={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
}

export default LoginAdmin;
