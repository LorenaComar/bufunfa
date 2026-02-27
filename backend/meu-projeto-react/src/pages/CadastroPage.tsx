import React from "react";
import AuthHeader from "../components/AuthHeader/AuthHeader";
import RegisterForm from "../components/RegisterForm/RegisterForm";

const CadastroPage: React.FC = () => {
  return (
    <div className="container-fluid container-int">
      {/* Cabeçalho apenas com título */}
      <AuthHeader title="Banco Bufunfa" />

      <div className="auth-wrap">
        <RegisterForm />
      </div>
    </div>
  );
};

export default CadastroPage;