import React, { useMemo } from "react";
import type { Transaction, Categoria } from "../../types/Transaction";
import "./TopCategories.css";

type Props = {
  items: Transaction[];
};

const order: Categoria[] = [
  "Gastos Fixos",
  "Medicamentos",
  "Comida",
  "Estudos",
  "Lazer",
  "Outros",
];

const TopCategories: React.FC<Props> = ({ items }) => {
  const { lista, maxValor, total } = useMemo(() => {
    const map = new Map<Categoria, number>();
    items.forEach((t) => {
      map.set(t.categoria as Categoria, (map.get(t.categoria as Categoria) ?? 0) + t.valor);
    });
    const arr = order
      .map((c) => ({ categoria: c, valor: map.get(c) ?? 0 }))
      .filter((x) => x.valor > 0);

    const max = arr.reduce((m, a) => Math.max(m, a.valor), 0);
    const sum = arr.reduce((s, a) => s + a.valor, 0);
    return { lista: arr, maxValor: max || 1, total: sum };
  }, [items]);

  return (
    <section className="TopCategories">
      <h3 className="title-accent mb-3">Onde você gasta mais</h3>

      {lista.length === 0 && (
        <div className="bufunfa-card-base p-3">
          <p className="m-0 text-muted-bf">Sem dados ainda. Adicione uma despesa.</p>
        </div>
      )}

      <div className="tc-grid">
        {lista.map((x) => {
          const pct = Math.round((x.valor / maxValor) * 100);
          return (
            <div key={x.categoria} className="bufunfa-card-base tc-card">
              <div className="tc-title">
                <span>{x.categoria}</span>
                <strong>R$ {x.valor.toFixed(2).replace(".", ",")}</strong>
              </div>
              <div className="tc-bar">
                <div className="tc-bar-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {total > 0 && (
        <small className="text-muted-bf d-block mt-2">
          Total analisado: R$ {total.toFixed(2).replace(".", ",")}
        </small>
      )}
    </section>
  );
};

export default TopCategories;
