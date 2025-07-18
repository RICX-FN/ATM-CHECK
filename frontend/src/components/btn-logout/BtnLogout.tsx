import React from 'react';
import '../btn-logout/btn-logout.css';
import { ReactElement } from 'react';
import { HiOutlineLogout } from 'react-icons/hi';


interface BtnLogoutProps {

    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

const BtnLogout: React.FC<BtnLogoutProps> = ({ onClick, type = "button" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="btn-logout"
        >
            
            {(HiOutlineLogout as any )({ size: 25, style: { color: '#fff', transition: '.7s ease;'} }) as ReactElement }
            <span>Logout</span>
        </button>
    );
};

export default BtnLogout;