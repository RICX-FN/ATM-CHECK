import React from 'react';
import '../button/button.css'; 


interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean; // 👈 adicionado
}


const Button: React.FC<ButtonProps> = ({ label, onClick, type = "button", className = "", disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      // Corrigido: Usando 'className' no atributo
      className={className}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;