import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav 
      className="bottom-nav fixed-bottom"
      style={{
        backgroundColor: 'var(--card)',
        borderTop: '1px solid var(--border)',
        padding: '10px 0'
      }}
    >
      <div className="container">
        <div className="row justify-content-around">
          <div className="col">
            <Link 
              to="/" 
              className={`d-flex flex-column align-items-center text-decoration-none ${
                location.pathname === '/' ? 'text-primary' : 'text-muted'
              }`}
            >
              <i className="fas fa-home mb-1"></i>
              <small>Início</small>
            </Link>
          </div>
          <div className="col">
            <Link 
              to="/transacoes" 
              className={`d-flex flex-column align-items-center text-decoration-none ${
                location.pathname === '/transacoes' ? 'text-primary' : 'text-muted'
              }`}
            >
              <i className="fas fa-exchange-alt mb-1"></i>
              <small>Transações</small>
            </Link>
          </div>
          <div className="col">
            <Link 
              to="/categorias" 
              className={`d-flex flex-column align-items-center text-decoration-none ${
                location.pathname === '/categorias' ? 'text-primary' : 'text-muted'
              }`}
            >
              <i className="fas fa-tags mb-1"></i>
              <small>Categorias</small>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;