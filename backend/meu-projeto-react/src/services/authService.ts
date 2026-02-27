import { api } from "./http";
import type { Usuario } from "../types/Usuario";

export type LoginPayload = { email: string; senha: string };
export type RegisterPayload = { nome: string; email: string; logradouro: string; senha: string };
export type AuthResponse = { token: string; usuario: Usuario };

export async function login(data: LoginPayload): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/usuarios/login", data);
  return response.data;
}

export async function register(data: RegisterPayload): Promise<Usuario> {
  const response = await api.post<Usuario>("/usuarios", data);
  return response.data;
}

export async function me(): Promise<Usuario> {
  // A rota /auth/me não existe no seu controller,
  // mas vamos assumir que a rota correta para o usuário seja /usuarios/me ou /usuarios/{id}
  // Se for uma rota que busca os dados do usuário logado:
  const response = await api.get<Usuario>("/auth/me"); 
  return response.data;
}

export function saveAuth(auth: AuthResponse) {
  localStorage.setItem("auth", JSON.stringify(auth));
}

export function getAuth(): AuthResponse | null {
  try {
    const auth = localStorage.getItem("auth");
    return auth ? JSON.parse(auth) : null;
  } catch {
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem("auth");
}

export function isAuthenticated(): boolean {
  const auth = getAuth();
  return !!(auth && auth.token);
}