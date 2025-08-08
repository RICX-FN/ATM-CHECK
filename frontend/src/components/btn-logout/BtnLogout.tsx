import React from 'react';
import '../btn-logout/btn-logout.css';
import { HiOutlineLogout } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { ReactElement } from 'react';

interface BtnLogoutProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const BtnLogout: React.FC<BtnLogoutProps> = ({ onClick, type = "button" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {

    if (onClick) onClick();

    // Redireciona para a página de login (pode trocar para /login-agent se quiser)
    navigate('/login-admin');
  };

  return (
    <button
      type={type}
      onClick={handleLogout}
      className="btn-logout"
    >
      {
        (HiOutlineLogout as any)({
          size: 25,
          style: { color: '#fff', transition: '.7s ease' }
        }) as ReactElement
      }
      <span>Logout</span>
    </button>
  );
};

export default BtnLogout;