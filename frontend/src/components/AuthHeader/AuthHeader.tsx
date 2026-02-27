import React from "react";
import "./AuthHeader.css";

type Props = {
  title?: string;
};

const AuthHeader: React.FC<Props> = ({ title = "Banco Bufunfa" }) => {
  return (
    <header className="AuthHeader" role="banner" aria-label="Cabeçalho de autenticação">
      <div className="container">
        <div className="d-flex align-items-center justify-content-center">
          <h1 className="auth-title m-0">{title}</h1>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;