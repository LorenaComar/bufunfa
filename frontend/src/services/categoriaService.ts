import { api } from "./http";
import type { Categoria } from "../types/Categoria";

export async function listarCategorias(): Promise<Categoria[]> {
  const { data } = await api.get<Categoria[]>("/categorias");
  return data;
}
export async function criarCategoria(payload: Omit<Categoria,"id">): Promise<Categoria> {
  const { data } = await api.post<Categoria>("/categorias", payload);
  return data;
}
