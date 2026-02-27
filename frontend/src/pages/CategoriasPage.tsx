import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import BottomNav from "../components/BottomNav/BottomNav";
import { getUserName } from "../utils/getUserName";
import type { Category } from "../types/categoryStore";
import {
  ensureDefaultsOnce,
  saveCategories,
  existsByName,
  normalizeName,
} from "../utils/categoryStore";

const CORES_CATEGORIAS = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD",
  "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9", "#F8C471", "#82E0AA"
];

const ICONES_CATEGORIAS = [
  { value: "fa-utensils", label: "Talheres" },
  { value: "fa-pills", label: "Remédios" },
  { value: "fa-book", label: "Livro" },
  { value: "fa-gamepad", label: "Controle" },
  { value: "fa-home", label: "Casa" },
  { value: "fa-shopping-cart", label: "Carrinho" },
  { value: "fa-car", label: "Carro" },
  { value: "fa-heart", label: "Coração" },
  { value: "fa-graduation-cap", label: "Formatura" },
  { value: "fa-plane", label: "Avião" },
  { value: "fa-gift", label: "Presente" },
  { value: "fa-tshirt", label: "Camiseta" }
];

const SUGESTOES = [
  "Comida", "Medicamentos", "Estudos", "Lazer", "Gastos Fixos", "Outros"
];

const CategoriasPage: React.FC = () => {
  const [categorias, setCategorias] = useState<Category[]>([]);
  const [nome, setNome] = useState<string>("Comida");
  const [cor, setCor] = useState(CORES_CATEGORIAS[0]);
  const [icone, setIcone] = useState(ICONES_CATEGORIAS[0].value);
  const [orcamento, setOrcamento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [editando, setEditando] = useState<Category | null>(null);
  const [transacoes, setTransacoes] = useState<any[]>([]);
  const navigate = useNavigate();
  const userName = getUserName();

  // CORREÇÃO: Carrega categorias e transações ao montar
  useEffect(() => {
    console.log('Carregando categorias...');
    const loadedCategories = ensureDefaultsOnce();
    setCategorias(loadedCategories);
    
    const rawTx = localStorage.getItem("bufunfa-transacoes");
    if (rawTx) {
      try {
        const parsedTx = JSON.parse(rawTx);
        setTransacoes(parsedTx);
        console.log('Transações carregadas:', parsedTx.length);
      } catch (error) {
        console.error('Erro ao carregar transações:', error);
        setTransacoes([]);
      }
    }
  }, []);

  // CORREÇÃO: Salva categorias sempre que mudar - DE VERDADE
  useEffect(() => {
    if (categorias.length > 0) {
      console.log('Salvando categorias automaticamente...', categorias.length);
      saveCategories(categorias);
    }
  }, [categorias]);

  // CORREÇÃO: Função para salvar manualmente também
  const salvarCategorias = () => {
    console.log('Salvamento manual acionado');
    saveCategories(categorias);
    alert('Categorias salvas com sucesso!');
  };

  // Calcula gastos por categoria
  function gastoTotal(nomeCategoria: string) {
    const key = normalizeName(nomeCategoria);
    return transacoes
      .filter((t) => normalizeName(t.categoria ?? "") === key)
      .reduce((total, t) => total + Number(t.valor || 0), 0);
  }

  function resetForm() {
    setNome("Comida");
    setCor(CORES_CATEGORIAS[0]);
    setIcone(ICONES_CATEGORIAS[0].value);
    setOrcamento("");
    setDescricao("");
    setEditando(null);
  }

  function iniciarEdicao(cat: Category) {
    setEditando(cat);
    setNome(cat.nome);
    setCor(cat.cor);
    setIcone(cat.icone);
    setOrcamento(cat.orcamento != null ? String(cat.orcamento).replace(".", ",") : "");
    setDescricao(cat.descricao ?? "");
  }

  function handleRemover(id: string) {
    if (!window.confirm("Tem certeza que deseja remover esta categoria?")) return;
    const novasCategorias = categorias.filter((c) => c.id !== id);
    setCategorias(novasCategorias);
    if (editando?.id === id) resetForm();
    saveCategories(novasCategorias);
  }

  function toggleAtiva(id: string) {
    const novasCategorias = categorias.map((c) => 
      c.id === id ? { ...c, ativa: !c.ativa } : c
    );
    setCategorias(novasCategorias);
    saveCategories(novasCategorias);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const orc = orcamento
      ? Number(orcamento.replace(/\./g, "").replace(",", "."))
      : undefined;

    if (editando) {
      if (
        categorias.some(
          (c) =>
            normalizeName(c.nome) === normalizeName(nome) &&
            c.id !== editando.id
        )
      ) {
        alert(`Já existe uma categoria com o nome "${nome}".`);
        return;
      }
      const atualizado: Category = {
        ...editando,
        nome,
        cor,
        icone,
        orcamento: isNaN(Number(orc)) ? undefined : orc,
        descricao: descricao.trim() || undefined,
      };
      const novasCategorias = categorias.map((c) => (c.id === editando.id ? atualizado : c));
      setCategorias(novasCategorias);
      saveCategories(novasCategorias);
      resetForm();
      return;
    }

    if (existsByName(categorias, nome)) {
      alert(`A categoria "${nome}" já existe. Use "Editar" para alterá-la.`);
      return;
    }
    const nova: Category = {
      id: String(Date.now()),
      nome: nome.trim(),
      cor,
      icone,
      orcamento: isNaN(Number(orc)) ? undefined : orc,
      descricao: descricao.trim() || undefined,
      ativa: true,
    };
    const novasCategorias = [...categorias, nova];
    setCategorias(novasCategorias);
    saveCategories(novasCategorias);
    resetForm();
  }

  const categoriasAtivas = categorias.filter((c) => c.ativa);

  return (
    <div className="container-fluid container-int">
      <Header title="Banco Bufunfa" userName={userName} />
      <div className="row justify-content-center mt-4">
        <div className="col-12 col-md-10 col-lg-8">
          {/* Cabeçalho com botão de salvar manual */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="title-accent m-0">
              <i className="fas fa-tags me-2" aria-hidden="true" />
              Categorias
            </h2>
            <div className="d-flex gap-2">
              <button
                className="btn btn-success btn-sm"
                onClick={salvarCategorias}
                title="Salvar categorias manualmente"
              >
                <i className="fas fa-save me-1" />
                Salvar
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => navigate("/")}
              >
                ← Voltar
              </button>
            </div>
          </div>

          {/* Formulário */}
          <div className="bufunfa-card-base p-4 mb-4">
            <h4 className="text-light mb-3">
              {editando ? "Editar Categoria" : "Nova Categoria"}
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label text-light">
                    Nome da Categoria
                  </label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="form-control login-input"
                    list="sugestoes-categorias"
                    style={{
                      background: "#121212",
                      color: "var(--fg)",
                      border: "1px solid var(--border)",
                    }}
                    disabled={!!editando}
                  />
                  <datalist id="sugestoes-categorias">
                    {SUGESTOES.map((s) => (
                      <option key={s} value={s} />
                    ))}
                  </datalist>
                  {editando && (
                    <small className="text-muted-bf">
                      O nome não pode ser alterado durante a edição.
                    </small>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label text-light">
                    Cor da Categoria
                  </label>
                  <div className="d-flex gap-2 flex-wrap">
                    {CORES_CATEGORIAS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        className="btn btn-sm rounded-circle"
                        style={{
                          width: 30,
                          height: 30,
                          backgroundColor: c,
                          border: cor === c ? "3px solid #fff" : "1px solid var(--border)",
                        }}
                        onClick={() => setCor(c)}
                        aria-label={`Selecionar cor ${c}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label text-light">Ícone</label>
                  <select
                    value={icone}
                    onChange={(e) => setIcone(e.target.value)}
                    className="form-select login-input"
                    style={{
                      background: "#121212",
                      color: "var(--fg)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {ICONES_CATEGORIAS.map((i) => (
                      <option key={i.value} value={i.value}>
                        {i.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label text-light">
                    Orçamento Mensal (opcional)
                  </label>
                  <input
                    type="text"
                    value={orcamento}
                    onChange={(e) => setOrcamento(e.target.value)}
                    placeholder="R$ 0,00"
                    className="form-control login-input"
                    style={{
                      background: "#121212",
                      color: "var(--fg)",
                      border: "1px solid var(--border)",
                    }}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label text-light">
                  Descrição (opcional)
                </label>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descreva esta categoria..."
                  className="form-control login-input"
                  style={{
                    background: "#121212",
                    color: "var(--fg)",
                    border: "1px solid var(--border)",
                    minHeight: 80,
                  }}
                  rows={3}
                />
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-bufunfa flex-fill" type="submit">
                  <i className={`fas ${editando ? "fa-save" : "fa-plus"} me-2`} />
                  {editando ? "Salvar Alterações" : "Adicionar Categoria"}
                </button>
                {(editando || categorias.length > 0) && (
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={resetForm}
                  >
                    {editando ? "Cancelar" : "Limpar"}
                  </button>
                )}
              </div>
              {!editando && existsByName(categorias, nome) && (
                <div className="alert alert-warning mt-3 mb-0" role="alert">
                  <i className="fas fa-exclamation-triangle me-2" />
                  A categoria "{nome}" já existe. Prefira <strong>Editar</strong> a existente.
                </div>
              )}
            </form>
          </div>

          {/* Lista de Categorias */}
          <div className="bufunfa-card-base p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h4 className="text-light m-0">Suas Categorias</h4>
              <span className="text-muted-bf">
                {categoriasAtivas.length} ativas de {categorias.length} total
              </span>
            </div>
            {categorias.length === 0 ? (
              <div className="text-center py-4">
                <i className="fas fa-tags fa-3x text-muted-bf mb-3" aria-hidden="true" />
                <p className="text-muted-bf m-0">Nenhuma categoria cadastrada.</p>
                <small className="text-muted-bf">
                  Use o formulário acima para criar sua primeira categoria.
                </small>
              </div>
            ) : (
              <div className="row g-3">
                {categorias.map((cat) => {
                  const gasto = gastoTotal(cat.nome);
                  const pct = cat.orcamento ? (gasto / cat.orcamento) * 100 : 0;
                  return (
                    <div key={cat.id} className="col-12 col-md-6 col-lg-4">
                      <div
                        className="card h-100"
                        style={{
                          background: "var(--card)",
                          border: `2px solid ${cat.cor}30`,
                          color: "var(--fg)",
                          opacity: cat.ativa ? 1 : 0.6,
                        }}
                      >
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <div
                              className="rounded-circle d-flex align-items-center justify-content-center"
                              style={{
                                width: 40,
                                height: 40,
                                backgroundColor: cat.cor,
                                color: "#fff",
                              }}
                            >
                              <i className={`fas ${cat.icone}`} />
                            </div>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={cat.ativa}
                                onChange={() => toggleAtiva(cat.id)}
                                style={{
                                  backgroundColor: cat.ativa ? cat.cor : "#6c757d",
                                }}
                              />
                            </div>
                          </div>
                          <h6 className="card-title mb-1">{cat.nome}</h6>
                          {cat.descricao && (
                            <small className="text-muted-bf d-block mb-2">
                              {cat.descricao}
                            </small>
                          )}
                          {!cat.ativa && (
                            <div className="badge bg-secondary mb-2">Inativa</div>
                          )}
                          <div className="mt-3">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                              <small className="text-muted-bf">Gasto total:</small>
                              <strong style={{ color: cat.cor }}>
                                R$ {gasto.toFixed(2).replace(".", ",")}
                              </strong>
                            </div>
                            {cat.orcamento != null && (
                              <>
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                  <small className="text-muted-bf">Orçamento:</small>
                                  <small>
                                    R$ {cat.orcamento.toFixed(2).replace(".", ",")}
                                  </small>
                                </div>
                                <div
                                  className="progress mb-2"
                                  style={{
                                    height: 6,
                                    backgroundColor: "#2a2a2a",
                                  }}
                                >
                                  <div
                                    className="progress-bar"
                                    style={{
                                      width: `${Math.min(pct, 100)}%`,
                                      backgroundColor:
                                        pct > 90
                                          ? "#FF6B6B"
                                          : pct > 70
                                          ? "#FFEAA7"
                                          : cat.cor,
                                    }}
                                  />
                                </div>
                                <small className="text-muted-bf d-block text-center">
                                  {Math.round(pct)}% do orçamento
                                </small>
                              </>
                            )}
                          </div>
                          <div className="d-flex gap-2 mt-3">
                            <button
                              className="btn btn-sm btn-warning flex-fill"
                              onClick={() => iniciarEdicao(cat)}
                            >
                              <i className="fas fa-edit me-1" /> Editar
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleRemover(cat.id)}
                            >
                              <i className="fas fa-trash me-1" /> Remover
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default CategoriasPage;