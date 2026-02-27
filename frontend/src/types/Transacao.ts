export type TipoTransacao = "ENTRADA" | "SAIDA";

export interface Transacao {
  id: number | string;
  contaId: number;
  categoriaId: number;
  tipo: TipoTransacao;
  valor: number;
  descricao: string;
  data: string; 
}
