import React from "react";
import "./Header.css";

type HeaderProps = {
  title?: string;
  userName?: string;
};

const Header: React.FC<HeaderProps> = ({
  title = "Banco Bufunfa",
  userName = "Kauany",
}) => {
  function handleLogout() {
    localStorage.removeItem("auth");
    window.location.href = "/login";
  }

  return (
    <header className="Header" role="banner">
      <div className="header-left">
        {/* Removido o logo, apenas o título */}
        <h1 className="header-title m-0">{title}</h1>
      </div>

      <div className="header-user">
        <i className="fas fa-user-circle" aria-hidden="true" />
        <span>Olá, {userName}</span>
        <button className="btn-logout" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </header>
  );
};

export default Header;