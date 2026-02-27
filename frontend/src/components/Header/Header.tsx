import React from 'react';

interface HeaderProps {
  title: string;
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ title, userName }) => {
  return (
    <header 
      className="py-3 mb-4"
      style={{
        backgroundColor: 'var(--primary)',
        borderBottom: '3px solid #ffd700',
        color: 'white'
      }}
    >
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col">
            <h1 className="h3 m-0 fw-bold">
              <i className="fas fa-piggy-bank me-2"></i>
              {title}
            </h1>
          </div>
          <div className="col-auto">
            <div className="d-flex align-items-center">
              <span className="me-3">Olá, {userName}!</span>
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: '45px',
                  height: '45px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: '2px solid white'
                }}
              >
                <i className="fas fa-user"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;