import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaExchangeAlt } from "react-icons/fa";
import "./BottomNav.css";

const BottomNav: React.FC = () => {
  const clazz = ({ isActive }: { isActive: boolean }) =>
    `nav-item-bf${isActive ? " active" : ""}`;

  return (
    <nav className="BottomNav navbar fixed-bottom" role="navigation" aria-label="Menu inferior">
      <div className="container-fluid">
        <div className="w-100 d-flex justify-content-around">
          <NavLink to="/" className={clazz} end>
            <FaHome aria-hidden="true" size={18} />
            <span>Início</span>
          </NavLink>

          <NavLink to="/transacoes" className={clazz}>
            <FaExchangeAlt aria-hidden="true" size={18} />
            <span>Transações</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;