import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Category } from '../../types/categoryStore';
import { ensureDefaultsOnce, normalizeName } from '../../utils/categoryStore';

interface CategoryDashboardProps {
  compact?: boolean;
}

const CategoryDashboard: React.FC<CategoryDashboardProps> = ({ compact = false }) => {
  const [categorias, setCategorias] = useState<Category[]>([]);
  const [transacoes, setTransacoes] = useState<any[]>([]);
  const navigate = useNavigate();

  // Carrega categorias e transações
  useEffect(() => {
    setCategorias(ensureDefaultsOnce());
    const rawTx = localStorage.getItem("bufunfa-transacoes");
    if (rawTx) {
      try {
        setTransacoes(JSON.parse(rawTx));
      } catch {
        // Ignora erro de parse
      }
    }
  }, []);

  // Calcula gastos por categoria
  function gastoTotal(nomeCategoria: string) {
    const key = normalizeName(nomeCategoria);
    return transacoes
      .filter((t) => normalizeName(t.categoria ?? "") === key)
      .reduce((total, t) => total + Number(t.valor || 0), 0);
  }

  // Calcula total gasto em todas as categorias
  const totalGasto = categorias
    .filter(cat => cat.ativa)
    .reduce((total, cat) => total + gastoTotal(cat.nome), 0);

  // Filtra apenas categorias ativas
  const categoriasAtivas = categorias.filter(cat => cat.ativa);

  // Ordena por maior gasto
  const categoriasOrdenadas = [...categoriasAtivas].sort((a, b) => 
    gastoTotal(b.nome) - gastoTotal(a.nome)
  );

  // Pega as top categorias para versão compacta
  const topCategorias = compact ? categoriasOrdenadas.slice(0, 4) : categoriasOrdenadas;

  if (compact) {
    return (
      <div className="bufunfa-card-base p-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 className="text-light m-0">
            <i className="fas fa-chart-pie me-2" aria-hidden="true" />
            Gastos por Categoria
          </h5>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigate("/categorias")}
          >
            Ver Todas
          </button>
        </div>

        {topCategorias.length === 0 ? (
          <div className="text-center py-3">
            <i className="fas fa-tags fa-2x text-muted-bf mb-2" aria-hidden="true" />
            <p className="text-muted-bf mb-2">Nenhuma categoria ativa</p>
            <button
              className="btn btn-bufunfa btn-sm"
              onClick={() => navigate("/categorias")}
            >
              Criar Categoria
            </button>
          </div>
        ) : (
          <div>
            {/* Resumo total */}
            <div className="d-flex justify-content-between align-items-center mb-3 p-3 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
              <span className="text-light">Total Gasto:</span>
              <strong className="text-warning">R$ {totalGasto.toFixed(2).replace(".", ",")}</strong>
            </div>

            {/* Lista de categorias */}
            {topCategorias.map((cat) => {
              const gasto = gastoTotal(cat.nome);
              const pct = cat.orcamento ? (gasto / cat.orcamento) * 100 : 0;
              const pctTotal = totalGasto > 0 ? (gasto / totalGasto) * 100 : 0;
              
              return (
                <div key={cat.id} className="mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-2"
                        style={{
                          width: 28,
                          height: 28,
                          backgroundColor: cat.cor,
                          color: "#fff",
                          fontSize: '12px'
                        }}
                      >
                        <i className={`fas ${cat.icone}`} />
                      </div>
                      <div>
                        <span className="text-light small">{cat.nome}</span>
                        <div className="d-flex gap-2">
                          <small className="text-muted-bf">
                            R$ {gasto.toFixed(2).replace(".", ",")}
                          </small>
                          {cat.orcamento && (
                            <small className="text-muted-bf">
                              • {Math.round(pct)}% do orçamento
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                    <small className="text-muted-bf">
                      {Math.round(pctTotal)}%
                    </small>
                  </div>
                  
                  {/* Barra de progresso */}
                  <div className="progress" style={{ height: '6px', backgroundColor: '#2a2a2a' }}>
                    <div
                      className="progress-bar"
                      style={{
                        width: `${pctTotal}%`,
                        backgroundColor: cat.cor,
                      }}
                    />
                  </div>

                  {/* Orçamento vs Gasto */}
                  {cat.orcamento && (
                    <div className="d-flex justify-content-between mt-1">
                      <small className="text-muted-bf">
                        Orçamento: R$ {cat.orcamento.toFixed(2).replace(".", ",")}
                      </small>
                      <small className={pct > 90 ? "text-danger" : pct > 70 ? "text-warning" : "text-success"}>
                        {Math.round(pct)}%
                      </small>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Botão para ver mais se houver mais categorias */}
            {categoriasAtivas.length > 4 && (
              <div className="text-center mt-3">
                <button
                  className="btn btn-outline-bufunfa btn-sm"
                  onClick={() => navigate("/categorias")}
                >
                  + {categoriasAtivas.length - 4} categorias
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Versão completa (não usada no dashboard, mas mantida para futuro)
  return (
    <div className="bufunfa-card-base p-4">
      <h4 className="text-light mb-3">
        <i className="fas fa-chart-pie me-2" aria-hidden="true" />
        Controle Completo de Gastos
      </h4>
      {/* Conteúdo completo aqui */}
    </div>
  );
};

export default CategoryDashboard;