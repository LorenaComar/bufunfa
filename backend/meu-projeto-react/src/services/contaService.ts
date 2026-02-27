import { api } from "./http";
import type { Conta } from "../types/Conta";

export async function minhaConta(): Promise<Conta> {
  const { data } = await api.get<Conta>("/contas/minha");
  return data;
}
