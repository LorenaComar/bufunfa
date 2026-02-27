import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { login, saveAuth } from "../../services/authService";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      // Opção 1: Se o login espera email e password separados
      const auth = await login(email, senha);
      
      // Opção 2: Se o auth retorna um objeto com token e user
      saveAuth(auth.token, auth.user);
      
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Falha no login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="card-body">
        <h2 className="title-accent mb-3 text-center">Entrar</h2>
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">E-mail</label>
            <input 
              id="email" 
              className="form-control login-input"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              disabled={loading}
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label" htmlFor="senha">Senha</label>
            <input 
              id="senha" 
              className="form-control login-input"
              type="password" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              required 
              disabled={loading}
            />
          </div>
          
          <button 
            className="btn btn-bufunfa w-100" 
            disabled={loading}
            type="submit"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        
        <button 
          className="register-link d-block text-center mt-3 w-100 border-0 bg-transparent"
          onClick={() => navigate("/cadastro")}
          disabled={loading}
        >
          Não tem conta? Cadastre-se
        </button>
      </div>
    </div>
  );
};

export default LoginForm;