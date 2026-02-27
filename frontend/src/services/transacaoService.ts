import { api } from "./http";
import type { Transacao } from "../types/Transacao";

export type Filtro = { contaId: number; de?: string; ate?: string; page?: number; size?: number };

export async function listarTransacoes(params: Filtro) {
  const { data } = await api.get("/transacoes", { params });
  return data; // espere { content, totalElements, totalPages }
}

export async function criarTransacao(payload: Omit<Transacao,"id">): Promise<Transacao> {
  const { data } = await api.post<Transacao>("/transacoes", payload);
  return data;
}
