import React from 'react';
import '../email-input/emailinput.css'


interface EmailInputProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
  value,
  onChange,
  placeholder = "exemplo@gmail.com",
  required = true,
  className = "",
}) => {


  return (
    <div className={`email-input ${className}`}>
      <input
        type="email"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default EmailInput;
