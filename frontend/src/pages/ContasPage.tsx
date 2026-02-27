// src/pages/ContasPage.tsx
import React, { useState } from "react";
import type { Conta } from "../types/Conta";


const CONTAS_INICIAIS: Conta[] = [
  { id: "corrente", nome: "Conta Corrente", saldo: 1500 },
  { id: "poupanca", nome: "Conta Poupança", saldo: 3000 },
  { id: "pj", nome: "Conta PJ", saldo: 5000 },
];

const ContasPage: React.FC = () => {
  const [contas, setContas] = useState<Conta[]>(CONTAS_INICIAIS);
  const [origem, setOrigem] = useState<string>("corrente");
  const [destino, setDestino] = useState<string>("poupanca");
  const [valor, setValor] = useState<string>("");
  const [mensagem, setMensagem] = useState<string>("");

  function handleTransferir(e: React.FormEvent) {
    e.preventDefault();
    setMensagem("");
    const valorNum = Number(valor.replace(",", "."));
    if (!valorNum || valorNum <= 0) {
      setMensagem("Informe um valor válido.");
      return;
    }
    if (origem === destino) {
      setMensagem("Escolha contas diferentes para transferir.");
      return;
    }
    const contaOrigem = contas.find((c) => c.id === origem)!;
    if (contaOrigem.saldo < valorNum) {
      setMensagem("Saldo insuficiente na conta de origem.");
      return;
    }
    setContas((prev) =>
      prev.map((c) =>
        c.id === origem
          ? { ...c, saldo: c.saldo - valorNum }
          : c.id === destino
          ? { ...c, saldo: c.saldo + valorNum }
          : c
      )
    );
    setMensagem(`Transferência de R$ ${valorNum.toFixed(2).replace(".", ",")} realizada!`);
    setValor("");
  }

  return (
    <div className="container py-4">
      <h2>Minhas Contas</h2>
      <div className="row mb-4">
        {contas.map((conta) => (
          <div key={conta.id} className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{conta.nome}</h5>
                <p className="card-text">
                  Saldo: <strong>R$ {conta.saldo.toFixed(2).replace(".", ",")}</strong>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3>Transferir entre contas</h3>
      <form onSubmit={handleTransferir} className="row g-3 mb-3">
        <div className="col-md-4">
          <label className="form-label">Conta de Origem</label>
          <select
            className="form-select"
            value={origem}
            onChange={(e) => setOrigem(e.target.value)}
          >
            {contas.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Conta de Destino</label>
          <select
            className="form-select"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
          >
            {contas.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Valor</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ex: 100,00"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Transferir
          </button>
        </div>
      </form>
      {mensagem && (
        <div className={`alert ${mensagem.includes("realizada") ? "alert-success" : "alert-danger"}`}>
          {mensagem}
        </div>
      )}
    </div>
  );
};

export default ContasPage;