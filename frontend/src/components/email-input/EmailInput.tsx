// EmailInput.tsx
import React from 'react';
import './emailinput.css';

type EmailInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  ({ placeholder = "Exemplo@gmail.com", className = "", ...rest }, ref) => {
    return (
      <div className={`email-input ${className}`}>
        <input
          type="email"
          ref={ref}
          placeholder={placeholder}
          {...rest}
        />
      </div>
    );
  }
);

export default EmailInput;
