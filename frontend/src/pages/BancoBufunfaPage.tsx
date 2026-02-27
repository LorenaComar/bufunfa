import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import BottomNav from '../components/BottomNav/BottomNav';
import CategoryDashboard from '../components/CategoryDashboard/CategoryDashboard';
import { getUserName } from '../utils/getUserName';

const BancoBufunfaPage: React.FC = () => {
  const navigate = useNavigate();
  const userName = getUserName();

  // Calcular saldo total (exemplo)
  const calcularSaldoTotal = () => {
    const transacoes = JSON.parse(localStorage.getItem('bufunfa-transacoes') || '[]');
    const saldoInicial = Number(localStorage.getItem('bufunfa-saldo-inicial') || '0');
    
    const totalDespesas = transacoes
      .filter((t: any) => t.tipo === 'despesa')
      .reduce((total: number, t: any) => total + Number(t.valor || 0), 0);
    
    const totalReceitas = transacoes
      .filter((t: any) => t.tipo === 'receita')
      .reduce((total: number, t: any) => total + Number(t.valor || 0), 0);
    
    return saldoInicial + totalReceitas - totalDespesas;
  };

  const saldoTotal = calcularSaldoTotal();

  return (
    <div className="container-fluid container-int">
      <Header title="Banco Bufunfa" userName={userName} />
      
      <div className="row justify-content-center mt-4">
        <div className="col-12 col-md-10 col-lg-8">
          {/* Card de Saldo */}
          <div className="bufunfa-card-base p-4 mb-4 text-center">
            <h3 className="text-light mb-2">Saldo Total</h3>
            <h1 className={saldoTotal >= 0 ? "text-success" : "text-danger"}>
              R$ {Math.abs(saldoTotal).toFixed(2).replace(".", ",")}
              {saldoTotal < 0 && " (-)"}
            </h1>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <button 
                className="btn btn-success"
                onClick={() => navigate("/transacoes?tipo=receita")}
              >
                <i className="fas fa-plus me-2"></i>
                Nova Receita
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => navigate("/transacoes?tipo=despesa")}
              >
                <i className="fas fa-minus me-2"></i>
                Nova Despesa
              </button>
            </div>
          </div>

          <div className="row">
            {/* Coluna do Controle de Gastos por Categoria */}
            <div className="col-12 col-lg-6 mb-4">
              <CategoryDashboard compact={true} />
            </div>

            {/* Coluna de Estatísticas Rápidas */}
            <div className="col-12 col-lg-6 mb-4">
              <div className="bufunfa-card-base p-4">
                <h5 className="text-light mb-3">
                  <i className="fas fa-chart-bar me-2" aria-hidden="true" />
                  Estatísticas
                </h5>
                
                {/* Estatísticas de Transações */}
                <div className="row text-center">
                  <div className="col-6 mb-3">
                    <div className="p-3 rounded" style={{ backgroundColor: 'rgba(40, 167, 69, 0.1)' }}>
                      <i className="fas fa-arrow-up text-success fa-lg mb-2"></i>
                      <div className="text-success fw-bold">Receitas</div>
                      <small className="text-light">
                        R$ {calcularSaldoTotal() >= 0 ? calcularSaldoTotal().toFixed(2) : '0,00'}
                      </small>
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div className="p-3 rounded" style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)' }}>
                      <i className="fas fa-arrow-down text-danger fa-lg mb-2"></i>
                      <div className="text-danger fw-bold">Despesas</div>
                      <small className="text-light">
                        R$ {calcularSaldoTotal() < 0 ? Math.abs(calcularSaldoTotal()).toFixed(2) : '0,00'}
                      </small>
                    </div>
                  </div>
                </div>

                {/* Ações Rápidas */}
                <div className="mt-3">
                  <h6 className="text-light mb-2">Ações Rápidas</h6>
                  <div className="d-grid gap-2">
                    <button 
                      className="btn btn-outline-bufunfa btn-sm"
                      onClick={() => navigate("/transacoes")}
                    >
                      <i className="fas fa-list me-2"></i>
                      Ver Todas as Transações
                    </button>
                    <button 
                      className="btn btn-outline-bufunfa btn-sm"
                      onClick={() => navigate("/categorias")}
                    >
                      <i className="fas fa-cog me-2"></i>
                      Gerenciar Categorias
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Últimas Transações */}
          <div className="bufunfa-card-base p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="text-light m-0">
                <i className="fas fa-clock me-2" aria-hidden="true" />
                Transações Recentes
              </h5>
              <button 
                className="btn btn-outline-secondary btn-sm"
                onClick={() => navigate("/transacoes")}
              >
                Ver Todas
              </button>
            </div>
            
            {/* Aqui você pode adicionar a lista de transações recentes */}
            <div className="text-center py-4">
              <i className="fas fa-exchange-alt fa-2x text-muted-bf mb-3" aria-hidden="true" />
              <p className="text-muted-bf">Nenhuma transação recente</p>
              <button 
                className="btn btn-bufunfa btn-sm"
                onClick={() => navigate("/transacoes")}
              >
                Criar Primeira Transação
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default BancoBufunfaPage;