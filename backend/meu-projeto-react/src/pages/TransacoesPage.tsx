// src/pages/TransacoesPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionForm from "../components/Transactions/TransactionForm";
import TopCategories from "../components/Transactions/TopCategories";
import type { Transaction } from "../types/Transaction";

const KEY = "bufunfa-transacoes";

function load(): Transaction[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
function save(arr: Transaction[]) {
  localStorage.setItem(KEY, JSON.stringify(arr));
}

const TransacoesPage: React.FC = () => {
  const [items, setItems] = useState<Transaction[]>([]);
  const navigate = useNavigate();

  useEffect(() => { setItems(load()); }, []);
  useEffect(() => { save(items); }, [items]);

  function handleAdd(tx: Transaction) {
    setItems(prev => [tx, ...prev]);
  }

  return (
    <div className="container-fluid py-3">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h4 m-0">Transações</h1>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate("/")}>
          ← Página principal
        </button>
      </div>

      {/* FORM */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 col-xl-6">
          <div className="bufunfa-card-base p-3" style={{ border: "none", boxShadow: "none" }}>
            <TransactionForm onAdd={handleAdd} />
          </div>
        </div>
      </div>

      {/* CATEGORIAS */}
      <div className="row justify-content-center mt-4">
        <div className="col-12 col-md-10 col-lg-8 col-xl-6">
          <TopCategories items={items} />
        </div>
      </div>

      {/* LISTA */}
      <div className="row justify-content-center mt-4 mb-5">
        <div className="col-12 col-md-10 col-lg-8 col-xl-6">
          <div className="bufunfa-card-base p-3" style={{ border: "none", boxShadow: "none" }}>
            <h4 className="mb-3">Últimas lançadas</h4>
            {items.length === 0 ? (
              <p className="text-muted-bf m-0">Nada por aqui…</p>
            ) : (
              <ul className="list-group list-group-flush">
                {items.map((t) => (
                  <li
                    key={t.id}
                    className="list-group-item d-flex justify-content-between align-items-center text-light"
                    style={{ border: "none", background: "transparent", paddingLeft: 0, paddingRight: 0 }}
                  >
                    <div>
                      <strong>{t.categoria}</strong>
                      {t.descricao && <span className="text-muted-bf"> — {t.descricao}</span>}
                    </div>
                    <div>R$ {t.valor.toFixed(2).replace(".", ",")}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransacoesPage;
