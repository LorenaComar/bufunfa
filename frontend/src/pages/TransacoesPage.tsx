import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import BottomNav from '../components/BottomNav/BottomNav';
import { getUserName } from '../utils/getUserName';
import { ensureDefaultsOnce } from '../utils/categoryStore';

interface Transacao {
  id: string;
  tipo: 'receita' | 'despesa';
  valor: number;
  descricao: string;
  categoria: string;
  data: string;
  metodo: 'pix' | 'ted' | 'boleto' | 'dinheiro' | 'cartao';
  destinatario?: string;
}

const TransacoesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tipoInicial = searchParams.get('tipo') as 'receita' | 'despesa' | null;
  
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    tipo: tipoInicial || 'despesa',
    valor: '',
    descricao: '',
    categoria: '',
    data: new Date().toISOString().split('T')[0],
    metodo: 'pix' as 'pix' | 'ted' | 'boleto' | 'dinheiro' | 'cartao',
    destinatario: ''
  });
  const [editando, setEditando] = useState<Transacao | null>(null);
  
  const navigate = useNavigate();
  const userName = getUserName();

  // Carrega transações e categorias
  useEffect(() => {
    const stored = localStorage.getItem('bufunfa-transacoes');
    if (stored) {
      try {
        setTransacoes(JSON.parse(stored));
      } catch {
        setTransacoes([]);
      }
    }
    setCategorias(ensureDefaultsOnce());
  }, []);

  // Salva transações quando mudam - CORRIGIDO: dentro do componente
  useEffect(() => {
    console.log('Salvando transações...', transacoes.length);
    localStorage.setItem('bufunfa-transacoes', JSON.stringify(transacoes));
  }, [transacoes]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatarValor = (valor: string) => {
    // Remove tudo que não é número
    const apenasNumeros = valor.replace(/\D/g, '');
    // Converte para número e divide por 100 para ter decimais
    const numero = parseInt(apenasNumeros) / 100;
    return isNaN(numero) ? '' : numero.toFixed(2);
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarValor(e.target.value);
    setFormData(prev => ({
      ...prev,
      valor: valorFormatado
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.valor || !formData.descricao || !formData.categoria) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    const transacao: Transacao = {
      id: editando ? editando.id : String(Date.now()),
      tipo: formData.tipo,
      valor: parseFloat(formData.valor),
      descricao: formData.descricao,
      categoria: formData.categoria,
      data: formData.data,
      metodo: formData.metodo,
      destinatario: formData.destinatario || undefined
    };

    if (editando) {
      setTransacoes(prev => prev.map(t => t.id === editando.id ? transacao : t));
    } else {
      setTransacoes(prev => [...prev, transacao]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      tipo: 'despesa',
      valor: '',
      descricao: '',
      categoria: '',
      data: new Date().toISOString().split('T')[0],
      metodo: 'pix',
      destinatario: ''
    });
    setEditando(null);
  };

  const editarTransacao = (transacao: Transacao) => {
    setEditando(transacao);
    setFormData({
      tipo: transacao.tipo,
      valor: transacao.valor.toFixed(2),
      descricao: transacao.descricao,
      categoria: transacao.categoria,
      data: transacao.data,
      metodo: transacao.metodo,
      destinatario: transacao.destinatario || ''
    });
  };

  const excluirTransacao = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
      setTransacoes(prev => prev.filter(t => t.id !== id));
      if (editando?.id === id) {
        resetForm();
      }
    }
  };

  const categoriasAtivas = categorias.filter(cat => cat.ativa);
  const transacoesOrdenadas = [...transacoes].sort((a, b) => 
    new Date(b.data).getTime() - new Date(a.data).getTime()
  );

  const metodosPagamento = [
    { value: 'pix', label: 'PIX', icon: 'fa-bolt' },
    { value: 'ted', label: 'TED', icon: 'fa-exchange-alt' },
    { value: 'boleto', label: 'Boleto', icon: 'fa-barcode' },
    { value: 'cartao', label: 'Cartão', icon: 'fa-credit-card' },
    { value: 'dinheiro', label: 'Dinheiro', icon: 'fa-money-bill' }
  ];

  return (
    <div className="container-fluid container-int">
      <Header title="Banco Bufunfa" userName={userName} />
      
      <div className="row justify-content-center mt-4">
        <div className="col-12 col-md-10 col-lg-8">
          {/* Cabeçalho */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="title-accent m-0">
              <i className="fas fa-exchange-alt me-2" aria-hidden="true" />
              Transações
            </h2>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate("/")}
            >
              ← Voltar ao Início
            </button>
          </div>

          {/* Formulário */}
          <div className="bufunfa-card-base p-4 mb-4">
            <h4 className="text-light mb-3">
              <i className={`fas ${editando ? 'fa-edit' : 'fa-plus'} me-2`} />
              {editando ? 'Editar Transação' : 'Nova Transação'}
            </h4>
            
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Tipo de Transação */}
                <div className="col-md-6 mb-3">
                  <label className="form-label text-light">Tipo de Transação *</label>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className={`btn flex-fill ${formData.tipo === 'receita' ? 'btn-success' : 'btn-outline-success'}`}
                      onClick={() => setFormData(prev => ({ ...prev, tipo: 'receita' }))}
                    >
                      <i className="fas fa-arrow-up me-2"></i>
                      Receita
                    </button>
                    <button
                      type="button"
                      className={`btn flex-fill ${formData.tipo === 'despesa' ? 'btn-danger' : 'btn-outline-danger'}`}
                      onClick={() => setFormData(prev => ({ ...prev, tipo: 'despesa' }))}
                    >
                      <i className="fas fa-arrow-down me-2"></i>
                      Despesa
                    </button>
                  </div>
                </div>

                {/* Valor */}
                <div className="col-md-6 mb-3">
                  <label className="form-label text-light">Valor *</label>
                  <div className="input-group">
                    <span className="input-group-text">R$</span>
                    <input
                      type="text"
                      name="valor"
                      value={formData.valor}
                      onChange={handleValorChange}
                      placeholder="0,00"
                      className="form-control login-input"
                      style={{
                        background: "#121212",
                        color: "var(--fg)",
                        border: "1px solid var(--border)",
                      }}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                {/* Descrição */}
                <div className="col-md-6 mb-3">
                  <label className="form-label text-light">Descrição *</label>
                  <input
                    type="text"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleInputChange}
                    placeholder="Ex: Pagamento de conta, Salário..."
                    className="form-control login-input"
                    style={{
                      background: "#121212",
                      color: "var(--fg)",
                      border: "1px solid var(--border)",
                    }}
                    required
                  />
                </div>

                {/* Categoria */}
                <div className="col-md-6 mb-3">
                  <label className="form-label text-light">Categoria *</label>
                  <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    className="form-select login-input"
                    style={{
                      background: "#121212",
                      color: "var(--fg)",
                      border: "1px solid var(--border)",
                    }}
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    {categoriasAtivas.map(cat => (
                      <option key={cat.id} value={cat.nome}>
                        {cat.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row">
                {/* Data */}
                <div className="col-md-4 mb-3">
                  <label className="form-label text-light">Data *</label>
                  <input
                    type="date"
                    name="data"
                    value={formData.data}
                    onChange={handleInputChange}
                    className="form-control login-input"
                    style={{
                      background: "#121212",
                      color: "var(--fg)",
                      border: "1px solid var(--border)",
                    }}
                    required
                  />
                </div>

                {/* Método de Pagamento */}
                <div className="col-md-4 mb-3">
                  <label className="form-label text-light">Método *</label>
                  <select
                    name="metodo"
                    value={formData.metodo}
                    onChange={handleInputChange}
                    className="form-select login-input"
                    style={{
                      background: "#121212",
                      color: "var(--fg)",
                      border: "1px solid var(--border)",
                    }}
                    required
                  >
                    {metodosPagamento.map(metodo => (
                      <option key={metodo.value} value={metodo.value}>
                        {metodo.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Destinatário (opcional) */}
                <div className="col-md-4 mb-3">
                  <label className="form-label text-light">Destinatário</label>
                  <input
                    type="text"
                    name="destinatario"
                    value={formData.destinatario}
                    onChange={handleInputChange}
                    placeholder="Para quem?"
                    className="form-control login-input"
                    style={{
                      background: "#121212",
                      color: "var(--fg)",
                      border: "1px solid var(--border)",
                    }}
                  />
                </div>
              </div>

              {/* Botões */}
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-bufunfa flex-fill">
                  <i className={`fas ${editando ? 'fa-save' : 'fa-check'} me-2`} />
                  {editando ? 'Salvar Alterações' : 'Adicionar Transação'}
                </button>
                {(editando || transacoes.length > 0) && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={resetForm}
                  >
                    <i className="fas fa-times me-2" />
                    {editando ? 'Cancelar' : 'Limpar'}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Lista de Transações */}
          <div className="bufunfa-card-base p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h4 className="text-light m-0">Histórico de Transações</h4>
              <span className="text-muted-bf">
                {transacoes.length} transações
              </span>
            </div>

            {transacoes.length === 0 ? (
              <div className="text-center py-4">
                <i className="fas fa-exchange-alt fa-3x text-muted-bf mb-3" aria-hidden="true" />
                <p className="text-muted-bf m-0">Nenhuma transação cadastrada.</p>
                <small className="text-muted-bf">
                  Use o formulário acima para criar sua primeira transação.
                </small>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-dark table-hover">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Descrição</th>
                      <th>Categoria</th>
                      <th>Método</th>
                      <th>Valor</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transacoesOrdenadas.map(transacao => (
                      <tr key={transacao.id}>
                        <td>{new Date(transacao.data).toLocaleDateString('pt-BR')}</td>
                        <td>
                          <div>
                            {transacao.descricao}
                            {transacao.destinatario && (
                              <small className="d-block text-muted-bf">
                                Para: {transacao.destinatario}
                              </small>
                            )}
                          </div>
                        </td>
                        <td>
                          <span className="badge" style={{ 
                            backgroundColor: categorias.find(c => c.nome === transacao.categoria)?.cor || '#6c757d',
                            color: 'white'
                          }}>
                            {transacao.categoria}
                          </span>
                        </td>
                        <td>
                          <i className={`fas ${metodosPagamento.find(m => m.value === transacao.metodo)?.icon} me-1`} />
                          {metodosPagamento.find(m => m.value === transacao.metodo)?.label}
                        </td>
                        <td className={transacao.tipo === 'receita' ? 'text-success' : 'text-danger'}>
                          {transacao.tipo === 'receita' ? '+' : '-'} R$ {transacao.valor.toFixed(2).replace(".", ",")}
                        </td>
                        <td>
                          <div className="d-flex gap-1">
                            <button
                              className="btn btn-sm btn-warning"
                              onClick={() => editarTransacao(transacao)}
                            >
                              <i className="fas fa-edit" />
                            </button>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => excluirTransacao(transacao.id)}
                            >
                              <i className="fas fa-trash" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default TransacoesPage;