import React from 'react';
import '../button/button.css';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'submit', 
  className = '',
  disabled = false,
  ariaLabel
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
      aria-label={ariaLabel || label} // ✅ Acessibilidade extra
    >
      {label}
    </button>
  );
};

export default Button;
