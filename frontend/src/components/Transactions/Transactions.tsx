import React from "react";
import type { Transaction } from "../../types/Transaction";
import "./Transactions.css";

type Props = { items?: Transaction[] }; // <- pode vir undefined

const Transactions: React.FC<Props> = ({ items }) => {
  // garante que sempre teremos um array
  const list: Transaction[] = Array.isArray(items) ? items : [];

  return (
    <section className="Transactions row mt-4 mb-5">
      <div className="col-12">
        <div className="bufunfa-card-base p-3">
          <h4 className="mb-3">Últimas lançadas</h4>

          {list.length === 0 ? (
            <p className="text-muted-bf m-0">Nada por aqui…</p>
          ) : (
            <ul className="list-group tx-list">
              {list.map((t) => (
                <li
                  key={t.id}
                  className="list-group-item d-flex justify-content-between align-items-center tx-item"
                >
                  <div>
                    <strong>{t.categoria}</strong>
                    {t.descricao ? (
                      <span className="text-muted-bf"> — {t.descricao}</span>
                    ) : null}
                  </div>
                  <div>R$ {t.valor.toFixed(2).replace(".", ",")}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default Transactions;
