// PasswordInput.tsx
import React from 'react';
import '../../styles/login-global.css';

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ placeholder = "Senha", className = "", ...rest }, ref) => {
    return (
      <div className={`password-input ${className}`}>
        <input
          type="password"
          ref={ref}
          placeholder={placeholder}
          {...rest}
        />
      </div>
    );
  }
);

export default PasswordInput;
