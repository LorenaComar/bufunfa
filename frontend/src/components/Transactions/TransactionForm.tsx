// src/components/Transactions/TransactionForm.tsx
import React, { useState } from "react";
import type { Transaction, Categoria, Intervalo } from "../../types/Transaction";

type Props = { onAdd(tx: Transaction): void };

const categorias: Categoria[] = [
  "Comida","Medicamentos","Estudos","Lazer","Gastos Fixos","Outros",
];

const intervalos: Intervalo[] = ["Único","Semanal","Mensal","Anual"];

const TransactionForm: React.FC<Props> = ({ onAdd }) => {
  const [valor, setValor] = useState<string>("");
  const [categoria, setCategoria] = useState<Categoria>("Comida");
  const [descricao, setDescricao] = useState<string>("");
  const [repetir, setRepetir] = useState<boolean>(false);
  const [intervalo, setIntervalo] = useState<Intervalo>("Mensal");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = Number(valor.replace(/\./g, "").replace(",", ".").trim());
    if (!v || v <= 0) { alert("Informe um valor válido."); return; }

    const tx: Transaction = {
      id: crypto.randomUUID(),
      valor: v,
      categoria,
      descricao: descricao.trim() || undefined,
      repetir,
      intervalo: repetir ? intervalo : "Único",
      createdAt: new Date().toISOString(),
    };

    onAdd(tx);
    setValor(""); setDescricao(""); setRepetir(false); setIntervalo("Mensal"); setCategoria("Comida");
  }

  return (
    <section className="TransactionForm bufunfa-card-base">
      <div className="card-body">
        <h3 className="title-accent mb-3">Adicionar Despesa</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Valor</label>
            <input
              className="form-control tx-input"
              placeholder="R$ 0,00"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              inputMode="decimal"
            />
            <small className="text-muted-bf">Use vírgula para centavos (ex: 32,50).</small>
          </div>

          <div className="mb-3">
            <label className="form-label">Categoria</label>
            <select
              className="form-select tx-input"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value as Categoria)}
            >
              {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <small className="text-muted-bf">+ Criar categoria (em breve)</small>
          </div>

          <div className="mb-3">
            <label className="form-label">Descrição</label>
            <input
              className="form-control tx-input"
              placeholder="Digite a descrição…"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div className="d-flex align-items-center justify-content-between mb-2">
            <label className="form-label m-0">Repetir esta conta</label>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={repetir}
                onChange={(e) => setRepetir(e.target.checked)}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Intervalo</label>
            <select
              className="form-select tx-input"
              value={intervalo}
              onChange={(e) => setIntervalo(e.target.value as Intervalo)}
              disabled={!repetir}
            >
              {intervalos.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>

          <button className="btn btn-bufunfa w-100" type="submit">Adicionar</button>
        </form>
      </div>
    </section>
  );
};

export default TransactionForm;
