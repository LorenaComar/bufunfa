import React from "react";
import AuthHeader from "../components/AuthHeader/AuthHeader";
import LoginForm from "../components/LoginForm/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <>
      <AuthHeader title="Banco Bufunfa" />
      <div className="auth-wrap">
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;