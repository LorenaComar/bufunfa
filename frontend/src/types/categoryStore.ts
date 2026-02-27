export interface Category {
  id: string;
  nome: string;
  cor: string;
  icone: string;
  orcamento?: number;
  descricao?: string;
  ativa: boolean;
}