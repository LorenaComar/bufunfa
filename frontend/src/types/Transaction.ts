// src/types/Transaction.ts
export type Categoria =
  | "Comida"
  | "Medicamentos"
  | "Estudos"
  | "Lazer"
  | "Gastos Fixos"
  | "Outros";

export type Intervalo = "Único" | "Semanal" | "Mensal" | "Anual";

export interface Transaction {
  id: string;
  valor: number;
  categoria: Categoria;
  descricao?: string;
  repetir: boolean;
  intervalo: Intervalo; // se repetir=false, gravamos "Único"
  createdAt: string;  
}
