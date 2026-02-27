// src/types/Usuario.ts
export interface Usuario {
  id: number;
  nome: string;
  email: string;
  logradouro: string;
  createdAt: string;
}

// src/types/Transaction.ts
export type Categoria = "Comida" | "Medicamentos" | "Estudos" | "Lazer" | "Gastos Fixos" | "Outros";
export type Intervalo = "Único" | "Semanal" | "Mensal" | "Anual";

export interface Transaction {
  id: string;
  valor: number;
  categoria: Categoria;
  descricao?: string;
  repetir: boolean;
  intervalo: Intervalo;
  createdAt: string;
}

// src/types/Categoria.ts (para Categories component)
export interface Category {
  id: string;
  icon: string;
  title: string;
  percent: number;
  amount: string;
}