import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./PasswordInput.css";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const EyeIcon = showPassword
    ? (FaEyeSlash as any)({
        size: 20,
        style: {color: "#fff", transition: ".3s ease" },
      })
    : (FaEye as any)({
        size: 20,
        style: {color: "#fff", transition: ".3s ease" },
      });

  return (
    <div className="password-wrapper">
      <input
        {...props}
        type={showPassword ? "text" : "password"}
        className="password-input"
        placeholder="Digite sua senha."
      />
      <span
        className={`eye-icon ${showPassword ? "active" : ""}`}
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {EyeIcon}
      </span>
    </div>
  );
};

export default PasswordInput;