import React from 'react';
import '../button/button.css'


interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="btn-login"
    >
      {label}
    </button>
  );
};

export default Button;
