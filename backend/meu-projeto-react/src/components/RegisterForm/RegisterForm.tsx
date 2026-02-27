import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";
import { register } from "../../services/authService";

const RegisterForm: React.FC = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ nome, email, logradouro, senha });
      alert("Conta criada! Faça login.");
      navigate("/login");
    } catch (err: any) {
      alert(err?.response?.data?.message ?? "Falha no cadastro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="card-body">
        <h2 className="title-accent mb-3">Criar conta</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label" htmlFor="nome">Nome</label>
            <input id="nome" className="form-control login-input" value={nome} onChange={e=>setNome(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">E-mail</label>
            <input id="email" className="form-control login-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="logradouro">Logradouro</label>
            <input id="logradouro" className="form-control login-input" value={logradouro} onChange={e=>setLogradouro(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="senha">Senha</label>
            <input id="senha" className="form-control login-input" type="password" value={senha} onChange={e=>setSenha(e.target.value)} required />
          </div>
          <button className="btn btn-bufunfa w-100" disabled={loading}>
            {loading ? "Salvando..." : "Criar conta"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
